using AutoMapper;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Application.Exceptions;
using ReadMindMe.Application.Interfaces;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Application.Services;

public class CommentService : ICommentService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CommentService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }
    public async Task<CommentDto> CommentPost(int postId, string content, int userId)
    {
        var post = await _unitOfWork.PostRepository.GetById(postId);
        if (post is null) throw new BadRequestException("");
        var user = await _unitOfWork.UserRepository.GetById(userId);
        if (user is null) throw new BadRequestException("user is not found ");
        var comment = new Comment()
        {
            User = user,
            Likes = 0,
            Content = content,
            Post = post
        };
        var newComment = await _unitOfWork.CommentRepository.Insert(comment);
        await _unitOfWork.Complete();
        return _mapper.Map<CommentDto>(newComment);
    }

    public async Task DeleteComment(int commentId)
    {

        var comment = await _unitOfWork.CommentRepository.GetById(commentId);
        if(comment is null) throw new BadRequestException("Comment Not Found");

        await _unitOfWork.CommentRepository.Delete(comment);
        await _unitOfWork.Complete();

    }

    public async Task LikeComment(int commentId)
    {
        var comment = await _unitOfWork.CommentRepository.GetById(commentId);
        if (comment is null) throw new BadRequestException("");
        comment.Likes++;
        await _unitOfWork.CommentRepository.Update(comment);
        await _unitOfWork.Complete();
    }

    public async Task UnLikeComment(int commentId)
    {
        var comment = await _unitOfWork.CommentRepository.GetById(commentId);
        if (comment is null) throw new BadRequestException("");
        comment.Likes--;
        await _unitOfWork.CommentRepository.Update(comment);
        await _unitOfWork.Complete();
    }
}
