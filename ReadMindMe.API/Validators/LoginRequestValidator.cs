
using FluentValidation;
using ReadMindMe.API.Models;

namespace ReadMindMe.API.Validators;

public class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()
    {
        RuleFor(x => x.Email).NotEmpty().WithMessage("Email is required.");

        RuleFor(x => x.Password).NotEmpty().WithMessage("Password is required.");
    }
}
