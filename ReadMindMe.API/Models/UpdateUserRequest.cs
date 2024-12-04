using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReadMindMe.API.Models;

public class UpdateUserRequest
{
    public IFormFile Avatar { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Bio { get; set; }
}
