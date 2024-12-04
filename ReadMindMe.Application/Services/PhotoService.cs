using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using ReadMindMe.Application.Helper;
using ReadMindMe.Application.Interfaces;

namespace ReadMindMe.Application.Services;

public class PhotoService : IPhotoService
{
    private readonly Cloudinary _cloudinary;
    public PhotoService(IOptions<CloudinarySettings> config)
    {
        var acc = new Account
            (
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
        _cloudinary = new Cloudinary(acc);
    }


    public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file, string userId)
    {
        var uploadResult = new ImageUploadResult();

        if (file.Length > 0)
        {
            // Generate a consistent public_id using the user's ID
            string publicId = $"Dating-net/profile_pictures/{userId}";

            // Check if the current public_id exists
            var existingResource = await _cloudinary.GetResourceAsync(new GetResourceParams(publicId));
            if (existingResource.StatusCode == System.Net.HttpStatusCode.OK)
            {
                // If it exists, delete the old image
                await DeletePhotoAsync(publicId);
            }

            // Upload the new profile picture
            using var stream = file.OpenReadStream();
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, stream),
                Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face"),
                Folder = "Read_Mind_Me/profile_pictures",
                PublicId = userId // Ensure a consistent identifier
            };
            uploadResult = await _cloudinary.UploadAsync(uploadParams);
        }

        return uploadResult;
    }




    public async Task<DeletionResult> DeletePhotoAsync(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);

        return await _cloudinary.DestroyAsync(deleteParams);
    }
}
