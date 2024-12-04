
using System.ComponentModel.DataAnnotations;

namespace ReadMindMe.Domain.Entities;

public class Verse : BaseEntity
{
    public string Text { get; set; }
    [AllowedValues(["Bible", "Quran", "Torah", "Bhagavad Gita", "Others"])]
    public string Book { get; set; }
    public Post? Post { get; set; }
    public int? PostId { get; set; }
}
