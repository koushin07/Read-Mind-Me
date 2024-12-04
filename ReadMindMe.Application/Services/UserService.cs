using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Application.Exceptions;
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
        // return new AuthenticatedDto()
        // {
        //     Token = _tokenService.CreateToken(user),
        //     User = _mapper.Map<UserDto>(user)

        // };
        return _mapper.Map<UserDto>(user);


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

        };
        await _unitOfWork.UserRepository.Insert(user);
        await _unitOfWork.Complete();
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
