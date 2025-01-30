using AutoMapper;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Application.Exceptions;
using ReadMindMe.Application.Interfaces;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Application.Services;

public class MessageService : IMessagesService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public MessageService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<int> CreateConversation(int creatorId, List<int> participants)
    {
        if (!participants.Contains(creatorId)) { participants.Add(creatorId); } // Create a new conversation
        var conversation = new Conversation { CreatedAt = DateTime.Now };


        participants.ForEach(participant =>
        {
            conversation.Participants.Add(new Participant { UserId = participant });
        });
        var newConvo = await _unitOfWork.ConversationRepository.Insert(conversation);
        await _unitOfWork.Complete();
        return newConvo.Id;


    }

    public async Task<ConversationDto> GetConversation(int conversationId)
    {
        var conversation = await _unitOfWork.ConversationRepository.GetById(conversationId);
        if (conversation is null) throw new BadRequestException("Conversation not found");
        return _mapper.Map<ConversationDto>(conversation);
    }

    public async Task<List<ConversationListDto>> GetConversationList(int authId)
    {
        var conversations = await _unitOfWork.MessageRepository.GetConversations(authId);
        return conversations.Select(c => _mapper.Map<ConversationListDto>(c, opt => opt.Items["userId"] = authId)).ToList();
    }

    public async Task<ConversationDto> MarkMessagesAsRead(int conversationId, int userId)
    {
        var conversation = await _unitOfWork.ConversationRepository.GetById(conversationId);
        if (conversation == null) throw new BadRequestException("");

        var participant = await _unitOfWork.ParticipantRepository.GetByUserId(userId);
        if (participant == null) throw new BadRequestException("");

        var messages = await _unitOfWork.MessageRepository.GetUnReadMessagesOfConversation(conversationId);

        foreach (var message in messages)
        {
            message.ReadAt = DateTime.UtcNow;

        }
        await _unitOfWork.Complete();
        return _mapper.Map<ConversationDto>(conversation);

    }

    public async Task<List<MessageDto>> OpenMessages(int conversationId, int userId)
    {
        var conversation = await _unitOfWork.ConversationRepository.GetById(conversationId);
        if (conversation == null) throw new BadRequestException("Conversaion not found");

        var participant = await _unitOfWork.ParticipantRepository.GetByUserId(userId);
        if (participant is null) throw new BadRequestException("User is not participant of this conversation");

        var messages = await _unitOfWork.MessageRepository.GetMessagesOfConversation(conversationId);
        foreach (var message in messages)
        {
            message.ReadAt = DateTime.Now;
        }
        await _unitOfWork.Complete();
        return messages.Select(_mapper.Map<MessageDto>).ToList();
    }


    public async Task SendMessage(int conversationId, int senderId, string content)
    {
        var conversation = await _unitOfWork.ConversationRepository.GetById(conversationId);
        if (conversation is null) throw new BadRequestException("Conversation not found");
        var sender = await _unitOfWork.UserRepository.GetById(senderId);
        if (sender is null) throw new BadRequestException("User not found");

        var participant = await _unitOfWork.ParticipantRepository.GetByUserAndConversation(sender.Id, conversation.Id);
        if (participant is null) throw new BadRequestException("User is not part of the conversation.");

        var message = new Message
        {
            Conversation = conversation,
            Sender = sender,
            Content = content,
        };
        conversation.Messages.Add(message);
        await _unitOfWork.Complete();
    }
}
