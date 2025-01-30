
using AutoMapper;
using ReadMindMe.Application.DTOs;
using ReadMindMe.Domain.Entities;

namespace ReadMindMe.Infrastructure.MappingProfiles;

public class ConversationProfile : Profile
{
    public ConversationProfile()
    {
        CreateMap<Conversation, ConversationDto>().ReverseMap();
        CreateMap<Message, MessageDto>().ReverseMap();
        CreateMap<Participant, ParticipantDto>().ReverseMap();

        CreateMap<Conversation, ConversationListDto>()
        .ForMember(x => x.Avatar, opt => opt.MapFrom((src, dest, destMember, context) =>
        {
            var userId = (int)context.Items["userId"];
            var filtered = src.Participants.Where(p => p.UserId != userId).ToList();
            return filtered.Last().User.Avatar;
        }))
        .ForMember(x => x.Id, opt => opt.MapFrom(src => src.Id))
        .ForMember(x => x.UserName, opt => opt.MapFrom((src, dest, destMember, context) =>
        {
            var userId = (int)context.Items["userId"];
            var filtered = src.Participants.Where(p => p.UserId != userId).ToList();
            return filtered.Last().User.Name;
        }))
        .ForMember(x => x.UnReadCount, opt => opt.MapFrom(src => src.Messages.Count(m => m.ReadAt == null)));



    }
}
