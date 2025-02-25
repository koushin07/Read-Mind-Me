
using AutoMapper;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Application.Exceptions;
using ReadMindMe.Application.Extensions;
using ReadMindMe.Application.Interfaces;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Application.Services;

public class PostService : IPostService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public PostService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task AddCommentToPost(int id, string textContent)
    {
        var post = await _unitOfWork.PostRepository.GetById(id);
        if (post is null) throw new BadRequestException("");
        var comment = new Comment()
        {
            Likes = 0,
            Content = textContent,
            Post = post
        };
        post.CommentPost(comment);
        await _unitOfWork.PostRepository.Update(post);
        await _unitOfWork.Complete();
    }

    public async Task<PostDto> CreatePost(PublicPostDto postDto)
    {
        var post = _mapper.Map<Post>(postDto);
        post.slug = post.Content.Slugify();
        post.Author = await _unitOfWork.UserRepository.GetById(post.Author.Id);
        if (post.PostType != "book")
        {
            post.Verse = null;
        }
        post.IsPublic = true;
        var newPost = await _unitOfWork.PostRepository.Insert(post);

        await _unitOfWork.Complete();
        return _mapper.Map<PostDto>(newPost);
    }

    public async Task DeletePost(int id, int userId)
    {
        var post = await _unitOfWork.PostRepository.GetById(id);
        if (post is null) throw new BadRequestException("post is not found ");
        if (post.AuthorId != userId) throw new BadRequestException("not authorized to delete post");

        await _unitOfWork.PostRepository.Delete(post);
        await _unitOfWork.Complete();
    }

    public async Task<List<PostDto>> GetPostsAsync()
    {
        var posts = await _unitOfWork.PostRepository.GetAll();
        var verses = new List<string>() { "John 3:16", "Psalm 34:8" };

        var appendedStart = "<span class=\"text-blue-600 after:content-['_↗']\">";
        var appendedEnd = "</span>";
        foreach (var post in posts)
        {
            var highlightedContent = post.Content;


            foreach (var verse in verses)
            {
                if (post.Content.ToLower().Contains(verse.ToLower()))
                {
                    highlightedContent = highlightedContent.Replace(verse, $"{appendedStart}{verse}{appendedEnd}", StringComparison.OrdinalIgnoreCase);

                }
            }
            post.Content = highlightedContent;
        }
        return posts.Select(_mapper.Map<PostDto>).ToList();

    }

    public async Task<List<PostDto>> GetPostTrending()
    {

        var posts = await _unitOfWork.PostRepository.GetAll();
        var trending = posts.OrderByDescending(p => p.Likes).ToList();
        return trending.Select(_mapper.Map<PostDto>).ToList();
    }

    public async Task<List<PostDto>> GetPublicPostsAsync()
    {

        var posts = await _unitOfWork.PostRepository.GetPublicPost();
        var verses = new List<string>() { "John 3:16", "Psalm 34:8" };

        // var content = "when i read the book of john specifically john 3:16 it gives me hope, and psalm 34:8 brings me peace";

        var appendedStart = "<span class='text-blue-600 hover:text-red-800 cursor-pointer' title='Highlighted Verse'>";
        var appendedEnd = "</span>";
        foreach (var post in posts)
        {
            var highlightedContent = post.Content;


            foreach (var verse in verses)
            {
                if (post.Content.ToLower().Contains(verse.ToLower()))
                {
                    highlightedContent = highlightedContent.Replace(verse, $"{appendedStart}{verse}{appendedEnd}", StringComparison.OrdinalIgnoreCase);

                }
            }
            post.Content = highlightedContent;
        }
        return posts.Select(_mapper.Map<PostDto>).ToList();
    }

    public async Task LikePost(int id, int userId)
    {

        var post = await _unitOfWork.PostRepository.GetById(id);
        if (post is null) throw new BadRequestException("post is not found ");
        var user = await _unitOfWork.UserRepository.GetById(userId);
        if (user is null) throw new BadRequestException("user is not found ");
        post.LikePost(user.Id);
        await _unitOfWork.Complete();
    }

    public async Task UnlikePost(int id, int userId)
    {
        var post = await _unitOfWork.PostRepository.GetById(id);
        if (post is null) throw new BadRequestException("post is not found ");
        var user = await _unitOfWork.UserRepository.GetById(userId);
        if (user is null) throw new BadRequestException("user is not found ");

        var postlike = await _unitOfWork.PostLikeRepository.GetByUserAndPostID(userId, id);
        if (postlike is null) throw new BadRequestException("The post is already Unlike");

        await _unitOfWork.PostLikeRepository.Delete(postlike);
        if (!await _unitOfWork.Complete())
        {
            throw new BadRequestException("Invalid Delation of post");
        }



    }

    public async Task UpdatePost(PostDto postDto)
    {
        var post = await _unitOfWork.PostRepository.GetById(postDto.Id);
        if (post is null) throw new BadRequestException("Invalid post");

        post.Content = postDto.Content;
        post.Verse.Text = postDto.Verse.Text;
        post.Verse.Book = postDto.Verse.Book;

        await _unitOfWork.PostRepository.Update(post);
        await _unitOfWork.Complete();
    }
}
