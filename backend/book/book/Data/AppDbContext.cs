using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using book.Models;

namespace book.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Recipe> Recipes { get; set; }
    }
}
