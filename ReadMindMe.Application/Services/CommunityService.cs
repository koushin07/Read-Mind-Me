
using AutoMapper;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Application.Exceptions;
using ReadMindMe.Application.Extensions;
using ReadMindMe.Application.Interfaces;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Application.Services;

public class CommunityService : ICommunityService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CommunityService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<PostDto> AddPost(CommunityPostDto communityPost)
    {

        var community = await _unitOfWork.CommunityRepository.GetById(communityPost.CommunityId);
        if (community is null) throw new BadRequestException("Community not found");
        var post = _mapper.Map<Post>(communityPost);

        post.Author = await _unitOfWork.UserRepository.GetById(post.Author.Id);
        post.slug = post.Content.Slugify();
        post.IsPublic = true;

        community.AddPost(post);
        await _unitOfWork.Complete();
        return _mapper.Map<PostDto>(post);

    }

    public async Task<CommunityDto> CreateCommunity(CommunityDto communityDto, int userId)
    {
        var community = _mapper.Map<Community>(communityDto);
        community.slug = communityDto.Name.Slugify();
        var user = await _unitOfWork.UserRepository.GetById(userId);
        if (user is null) throw new BadRequestException("No such User");

        community.AddMember(user);

        var newCommunity = await _unitOfWork.CommunityRepository.Insert(community);
        await _unitOfWork.Complete();
        return _mapper.Map<CommunityDto>(newCommunity, opt => opt.Items["userId"] = userId);
    }

    public async Task DeleteCommunity(int communityId)
    {
        var community = await _unitOfWork.CommunityRepository.GetById(communityId);
        await _unitOfWork.CommunityRepository.Delete(community);

    }


    public async Task<List<CommunityDto>> GetCommunities(int userId)
    {
        var communities = await _unitOfWork.CommunityRepository.GetAll();
        return communities.Select(c => _mapper.Map<CommunityDto>(c, opt => opt.Items["userId"] = userId)).ToList();
    }

    public async Task<CommunityDto> GetCommunityBySlug(string slug, int userId)
    {
        var community = await _unitOfWork.CommunityRepository.GetCommunityBySlug(slug);
        return _mapper.Map<CommunityDto>(community, opt => opt.Items["userId"] = userId);
    }

    public async Task<CommunityDto> JoinCommunity(int communityId, int userId)
    {
        var community = await _unitOfWork.CommunityRepository.GetById(communityId);
        var user = await _unitOfWork.UserRepository.GetById(userId);
        if (community is null) throw new BadRequestException("Community not found");
        if (user is null) throw new BadRequestException("User not found");

        community.AddMember(user);

        await _unitOfWork.Complete();
        return _mapper.Map<CommunityDto>(community, opt => opt.Items["userId"] = userId);

    }

    public Task UpdateCommunity(CommunityDto community)
    {
        throw new NotImplementedException();
    }
}
