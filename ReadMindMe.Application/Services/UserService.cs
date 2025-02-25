using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Application.Exceptions;
using ReadMindMe.Application.Extensions;
using ReadMindMe.Application.Interfaces;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Application.Services;

public class UserService : IUserService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;


    public UserService(IUnitOfWork unitOfWork, IMapper mapper, IPhotoService photoService)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _photoService = photoService;

    }

    public async Task FollowUser(int authId, int userId)
    {
        var auth = await _unitOfWork.UserRepository.GetById(authId);
        if (auth is null) throw new BadRequestException("No authenticated User found");
        var user = await _unitOfWork.UserRepository.GetById(userId);
        if (user is null) throw new BadRequestException("No User Found");

        var userFollow = await _unitOfWork.UserFollowRepository.GetByFollowedAndFollowerId(authId, userId);
        if (userFollow is not null) throw new BadRequestException("User is already following this user");
        await _unitOfWork.UserFollowRepository.Insert(new UserFollow()
        {
            FollowedId = userId,
            FollowerId = authId
        });
        await _unitOfWork.ActivityRepository.Insert(new Activity
        {
            User = auth.Name,
            Action = $"User {auth.Name} is following you",

        });

        await _unitOfWork.Complete();
    }



    public async Task<UserDetailDto> GetUserDetail(string slug, int userId)
    {
        var user = await _unitOfWork.UserRepository.GetBySlug(slug, userId);
        if (user is null) throw new NotFoundException(slug + " not found");
        var userDetail = _mapper.Map<UserDetailDto>(user);
        return userDetail;
    }

    public async Task<UserDto> Login(UserDto userDto)
    {
        if (!await _unitOfWork.UserRepository.ExistByEmail(userDto.Email))
        {
            throw new BadRequestException("Invalid email.");
        }
        var user = await _unitOfWork.UserRepository.GetByEmail(userDto.Email);
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));

        var passwordCheck = user.PasswordHash.SequenceEqual(computedHash);
        if (!passwordCheck) throw new BadRequestException("wrong password");

        return _mapper.Map<UserDto>(user);


    }

    public async Task<UserDto> LoginViaGoogle(OAuthRequest auth)
    {
        var user = await _unitOfWork.UserRepository.GetByEmail(auth.Email);
        if (user is not null) return _mapper.Map<UserDto>(user);

        using var hmac = new HMACSHA512();
        var password = auth.Email.Substring(0, auth.Email.IndexOf('@'));
        var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        var salt = hmac.Key;
        var newUser = new User
        {
            Email = auth.Email,
            Name = auth.Name,
            Slug = auth.Name.Slugify(),
            PasswordHash = hash,
            PasswordSalt = salt,
            Avatar = auth.Picture,
        };
        var insertedUser = await _unitOfWork.UserRepository.Insert(newUser);
        await _unitOfWork.Complete();
        return _mapper.Map<UserDto>(insertedUser);

    }

    public async Task Register(UserDto userDto)
    {


        if (await _unitOfWork.UserRepository.GetByEmail(userDto.Email) is not null) throw new BadRequestException("Email already exists.");

        using var hmac = new HMACSHA512();

        var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));
        var salt = hmac.Key;

        var user = new User
        {
            Email = userDto.Email,
            Name = userDto.Name,
            PasswordHash = hash,
            PasswordSalt = salt,
            Slug = userDto.Name.Slugify()


        };
        await _unitOfWork.UserRepository.Insert(user);
        await _unitOfWork.Complete();
    }

    public async Task<SearchDto> SearchAll(string searchTerm, int userId)
    {
        var posts = await _unitOfWork.PostRepository.GetAll();
        posts = posts.Where(p =>
            p.Content.ToLower().Contains(searchTerm.ToLower()) ||
            p.Author.Name.ToLower().Contains(searchTerm.ToLower())
        ).ToList();

        var communities = await _unitOfWork.CommunityRepository.GetAll();
        communities = communities.Where(c =>
            c.Description.ToLower().Contains(searchTerm.ToLower())||
            c.UserCommunities.Any(uc=>uc.User.Name.ToLower().Contains(searchTerm.ToLower()))
         ).ToList();

        var users = await _unitOfWork.UserRepository.GetAll();
        users = users.Where(u => u.Name.ToLower().Contains(searchTerm.ToLower())).ToList();

        return new SearchDto
        {
            Communities = communities.Select(c => _mapper.Map<CommunityDto>(c, opt => opt.Items["userId"] = userId)).ToList(),
            Posts = posts.Select(_mapper.Map<PostDto>).ToList(),
            Users = users.Select(_mapper.Map<UserDto>).ToList()
        };
    }

    public async Task<UserDto> UpdateUser(UserUpdateDto userDto)
    {
        var user = await _unitOfWork.UserRepository.GetById(userDto.Id);
        if (user is null) throw new BadRequestException("user is not available");

        user.Name = userDto.Name;
        user.Email = userDto.Email;

        var result = await _photoService.AddPhotoAsync(userDto.Avatar, user.Id.ToString());

        if (result.Error != null) throw new BadRequestException(result.Error.Message);

        user.Avatar = result.SecureUrl.AbsoluteUri;
        await _unitOfWork.UserRepository.Update(user);
        await _unitOfWork.Complete();

        return new UserDto()
        {
            Name = user.Name,
            Avatar = user.Avatar,
            Email = user.Email
        };
    }

}
