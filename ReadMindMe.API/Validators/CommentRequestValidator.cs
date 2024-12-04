
using FluentValidation;
using ReadMindMe.API.Models;

namespace ReadMindMe.API.Validators;

public class CommentRequestValidator : AbstractValidator<CommentRequest>
{

    public CommentRequestValidator()
    {
        RuleFor(x => x.Content)
            .NotEmpty()
            .WithMessage("Comment content is required.");
    }
}
