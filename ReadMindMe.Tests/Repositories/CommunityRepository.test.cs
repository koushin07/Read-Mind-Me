using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ReadMindMe.Domain.Entities;
using ReadMindMe.Infrastructure.Data;
using ReadMindMe.Infrastructure.MappingProfiles;
using ReadMindMe.Infrastructure.Repositories;

public class CommunityRepositoryTests
{
    private readonly MyDbContext _context;
    private readonly IMapper _mapper;
    private readonly CommunityRepository _communityRepository;

    public CommunityRepositoryTests()
    {
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDatabase")
            .Options;
        _context = new MyDbContext(options);

        var config = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<UserProfile>();

        });
        _mapper = config.CreateMapper();

        _communityRepository = new CommunityRepository(_context, _mapper);
    }

    [Fact]
    public async Task GetAll_ReturnsCommunities()
    {
        // Arrange
        var community = new Community
        {
            Name = "Test Community",
            slug = "test-community"
        };
        _context.Communities.Add(community);
        await _context.SaveChangesAsync();

        // Act
        var result = await _communityRepository.GetAll();

        // Assert
        Assert.NotEmpty(result);
        Assert.Equal("Test Community", result.First().Name);
    }

    [Fact]
    public async Task GetById_ReturnsCorrectCommunity()
    {
        // Arrange
        var community = new Community
        {
            Name = "Test Community",
            slug = "test-community"
        };
        _context.Communities.Add(community);
        await _context.SaveChangesAsync();

        // Act
        var result = await _communityRepository.GetById(community.Id);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Community", result.Name);
    }

    [Fact]
    public async Task Insert_AddsCommunity()
    {
        // Arrange
        var community = new Community
        {
            Name = "New Community",
            slug = "new-community"
        };

        // Act
        var result = await _communityRepository.Insert(community);
        await _context.SaveChangesAsync();

        // Assert
        var savedCommunity = await _context.Communities.FindAsync(result.Id);
        Assert.NotNull(savedCommunity);
        Assert.Equal("New Community", savedCommunity.Name);
    }

    [Fact]
    public async Task Delete_RemovesCommunity()
    {
        // Arrange
        var community = new Community
        {
            Name = "Test Community",
            slug = "test-community"
        };
        _context.Communities.Add(community);
        await _context.SaveChangesAsync();

        // Act
        await _communityRepository.Delete(community);
        await _context.SaveChangesAsync();

        // Assert
        var deletedCommunity = await _context.Communities.FindAsync(community.Id);
        Assert.Null(deletedCommunity);
    }
}
