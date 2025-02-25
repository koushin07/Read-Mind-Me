using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadMindMe.Tests.Services;

public class PostServiceTest
{
    public PostServiceTest()
    {

    }

    [Fact]
    public void GetBibleVerse_ShouldDetectAndUpdateBibleVerse()
    {
        var verses = new List<string>() { "John 3:16", "Psalm 34:8" };

        var content = "when i read the book of john specifically john 3:16 it gives me hope, and psalm 34:8 brings me peace";

        var appendedStart = "<p class=\"text-blue-600 after:content-['_↗']\">";
        var appendedEnd = "</p>";
        var originalContent = content;
        var highlightedContent = content;
        var highlights = new List<Dictionary<int, int>>();
        verses.ForEach(verse =>
        {
            var lowerCaseVerse = verse.ToLower();
            if (content.ToLower().Contains(lowerCaseVerse))
            {
                var firstIndex = verse.IndexOf(lowerCaseVerse);
                var lastIndex = verse.LastIndexOf(lowerCaseVerse) + lowerCaseVerse.Length - 1;
                var highlight = new Dictionary<int, int> { { firstIndex, lastIndex } };
                highlights.Add(highlight);
                // Highlight the verse
                highlightedContent = highlightedContent.Replace(verse, $"{appendedStart}{verse}{appendedEnd}", StringComparison.OrdinalIgnoreCase);
                Console.WriteLine("Bible verse detected and highlighted:");
                Console.WriteLine(highlightedContent);
            }
        });

        // Assert that the content is correctly highlighted
       Assert.Equal(1, highlights[0].Values.First());

    }
}
