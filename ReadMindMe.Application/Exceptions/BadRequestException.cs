using System.Runtime.Serialization;
namespace ReadMindMe.Application.Exceptions;


public class BadRequestException : System.Exception
{
    public BadRequestException()
    {
    }

    protected BadRequestException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public BadRequestException(string? message) : base(message)
    {
    }
}
