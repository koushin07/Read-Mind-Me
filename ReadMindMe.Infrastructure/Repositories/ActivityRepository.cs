
using Microsoft.EntityFrameworkCore;
using ReadMindMe.Domain.Contracts;
using ReadMindMe.Domain.Entities;
using ReadMindMe.Infrastructure.Data;

namespace ReadMindMe.Infrastructure.Repositories;

public class ActivityRepository : IActivityRepository
{
    private readonly MyDbContext _context;

    public ActivityRepository(MyDbContext context)
    {
        _context = context;
    }
    public Task Delete(Activity entity)
    {
        throw new NotImplementedException();
    }

    public async Task<List<Activity>> GetAll()
    {
        return await _context.Activities.ToListAsync();
    }

    public async Task<Activity> GetById(int id)
    {
        return await _context.Activities.FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<Activity> Insert(Activity entity)
    {
        var activity = await _context.Activities.AddAsync(entity);
        return activity.Entity;
    }

    public Task Update(Activity entity)
    {
        _context.Activities.Update(entity);
        return Task.CompletedTask;
    }
}
