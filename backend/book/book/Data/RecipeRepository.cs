using book.Data;
using book.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using book.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace book.Data
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly AppDbContext _context;

        public RecipeRepository(AppDbContext context)
        {
            _context = context;
        }

        //pobieranie przepisów z bazy wraz z sortowaniem i filtrowaniem po nazwie
        public async Task<IEnumerable<Recipe>> GetAll(string? search = null, string? sortOrder = null)
        {
            var query = _context.Recipes.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(r => r.Name.Contains(search));
            }

            if (sortOrder == "asc")
            {
                query = query.OrderBy(r => r.Name);
            }
            else if (sortOrder == "desc")
            {
                query = query.OrderByDescending(r => r.Name);
            }

            return await query.ToListAsync();
        }

        //pobieranie przepisu po id
        public async Task<Recipe?> GetById(int id)
        {
            return await _context.Recipes.FindAsync(id);
        }

        //dodawanie przepisu do bazy 
        public async Task Add(Recipe recipe)
        {
            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();
        }

        //aktualizacja przepisu
        public async Task Update(Recipe recipe)
        {
            _context.Recipes.Update(recipe);
            await _context.SaveChangesAsync();
        }

        //usuwanie przepisu
        public async Task Delete(int id)
        {
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe != null)
            {
                _context.Recipes.Remove(recipe);
                await _context.SaveChangesAsync();
            }
        }


    }
}



