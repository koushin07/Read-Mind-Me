
using System.Text.Json.Serialization;

namespace ReadMindMe.Domain.Entities;

public class Guideline : BaseEntity
{
    public string Value { get; set; }
    [JsonIgnore]
    public Community Community { get; set; }
    public int CommunityId { get; set; }

}
