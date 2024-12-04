using AutoMapper;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Infrastructure.MappingProfiles;

public class VerseProfile: Profile
{
    public VerseProfile()
    {
        CreateMap<Verse, VerseDto>().ReverseMap();
    }
}
