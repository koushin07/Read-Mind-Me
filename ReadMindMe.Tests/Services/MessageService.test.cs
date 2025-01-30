

using AutoMapper;
using Moq;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Application.Exceptions;
using ReadMindMe.Application.Services;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;
using ReadMindMe.Infrastructure.MappingProfiles;

public class MessageServiceTests
{
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly Mock<IConversationRepository> _conversationRepositoryMock;
    private readonly Mock<IParticipantRepository> _participantRepositoryMock;
    private readonly Mock<IMessageRepository> _messageRepositoryMock;
    private readonly IMapper _mapper;
    private readonly MessageService _messageService;

    public MessageServiceTests()
    {
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _conversationRepositoryMock = new Mock<IConversationRepository>();
        _participantRepositoryMock = new Mock<IParticipantRepository>();
        _messageRepositoryMock = new Mock<IMessageRepository>();

        _unitOfWorkMock.Setup(u => u.ConversationRepository).Returns(_conversationRepositoryMock.Object);
        _unitOfWorkMock.Setup(u => u.ParticipantRepository).Returns(_participantRepositoryMock.Object);
        _unitOfWorkMock.Setup(u => u.MessageRepository).Returns(_messageRepositoryMock.Object);
        var config = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<ConversationProfile>();
            cfg.AddProfile<UserProfile>();
        });
        _mapper = config.CreateMapper();
        _messageService = new MessageService(_unitOfWorkMock.Object, _mapper);
    }

    [Fact]
    public async Task OpenMessages_ConversationNotFound_ThrowsBadRequestException()
    {
        // Arrange
        _conversationRepositoryMock.Setup(r => r.GetById(It.IsAny<int>())).ReturnsAsync((Conversation)null);

        // Act & Assert
        await Assert.ThrowsAsync<BadRequestException>(() => _messageService.OpenMessages(1, 1));
    }

    [Fact]
    public async Task OpenMessages_UserNotParticipant_ThrowsBadRequestException()
    {
        // Arrange
        var conversation = new Conversation();
        _conversationRepositoryMock.Setup(r => r.GetById(It.IsAny<int>())).ReturnsAsync(conversation);
        _participantRepositoryMock.Setup(r => r.GetByUserId(It.IsAny<int>())).ReturnsAsync((Participant)null);

        // Act & Assert
        await Assert.ThrowsAsync<BadRequestException>(() => _messageService.OpenMessages(1, 1));
    }

    [Fact]
    public async Task OpenMessages_ValidRequest_ReturnsMessagesAndMarksAsRead()
    {
        // Arrange
        var conversation = new Conversation();
        var participant = new Participant();
        var messages = new List<Message>
        {
            new Message { Id = 1, ReadAt = null },
            new Message { Id = 2, ReadAt = null }
        };

        _conversationRepositoryMock.Setup(r => r.GetById(It.IsAny<int>())).ReturnsAsync(conversation);
        _participantRepositoryMock.Setup(r => r.GetByUserId(It.IsAny<int>())).ReturnsAsync(participant);
        _messageRepositoryMock.Setup(r => r.GetMessagesOfConversation(It.IsAny<int>())).ReturnsAsync(messages);

        // Act
        var result = await _messageService.OpenMessages(1, 1);

        // Assert
        Assert.Equal(2, result.Count);
        Assert.IsType<List<MessageDto>>(result);
        Assert.All(result, message => Assert.NotNull(message.ReadAt));
        _unitOfWorkMock.Verify(u => u.Complete(), Times.Once);
    }
    [Fact]
    public async Task GetConversationList()
    {
        //Arrange

        var conversation = new List<Conversation>
        {

            new Conversation
            {
                Id = 1,
                CreatedAt = DateTime.Now,

                Participants = new List<Participant>
                {
                    new Participant
                    {
                        Id = 1,
                        User = new User
                        {
                            Id=1,
                            Name= "test1",
                            Email = "test@gmial.com",


                        },
                        CreatedAt= DateTime.Now,
                        Conversation = new Conversation()
                    }
                },
                    Messages = new List<Message>
                {
                    new Message { Id = 1, ReadAt = null, Sender = new User {Name = "sender1"},  Conversation = new Conversation() },
                    new Message { Id = 2, ReadAt = null , Sender = new User {Name = "sender2"},  Conversation = new Conversation()}
                }
            }
        };

        _messageRepositoryMock.Setup(r => r.GetConversations(1)).ReturnsAsync(conversation);

        //Act
        var result = await _messageService.GetConversationList(1);

        Assert.IsType<List<ConversationListDto>>(result);
        Assert.Equal(2, result[0].UnReadCount);
        Assert.Equal("sender2", result[0].UserName);


    }
}
