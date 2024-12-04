
using FluentValidation;
using ReadMindMe.API.Models;

namespace ReadMindMe.API.Validators;

public class PostRequestValidator : AbstractValidator<PostRequest>
{
    public PostRequestValidator()
    {
        RuleFor(x => x.Verse.Book)
       .Must(book => string.IsNullOrEmpty(book) ||
                     new[] { "Bible", "Quran", "Torah", "Bhagavad Gita", "Others" }.Contains(book))
       .WithMessage("BookName must be empty or one of the following: Bible, Quran, Torah, Bhagavad Gita, Others.");

        RuleFor(x => x.Verse.Book)
            .NotEmpty()
            .When(x => x.PostType == "Book")
            .WithMessage("BookName is required when PostType is 'Book'.");

        RuleFor(x => x.Content)
            .NotEmpty()
            .WithMessage("No Content");

        RuleFor(x => x.PostType)
            .Must(type => string.IsNullOrEmpty(type) ||
                          new[] { "book", "prayer", "question", "thoughts", "guide" }.Contains(type))
            .WithMessage("PostType must be empty or one of the following: Book, Prayer, Question, Thoughts, Guide.");

    }
}
