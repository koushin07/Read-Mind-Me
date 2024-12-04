

using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace ReadMindMe.Application.Interfaces;

public interface IPhotoService
{
    Task<ImageUploadResult> AddPhotoAsync(IFormFile file, string userId);
    Task<DeletionResult> DeletePhotoAsync(string publicId);
}
