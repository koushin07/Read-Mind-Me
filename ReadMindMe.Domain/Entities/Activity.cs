
using System.Text.Json.Serialization;

namespace ReadMindMe.Domain.Entities;

public class Activity : BaseEntity
{
    public string Action { get; set; }
    public string User { get; set; }
    [JsonIgnore]
    public Community Community { get; set; }
    public int CommunityId { get; set; }
}
