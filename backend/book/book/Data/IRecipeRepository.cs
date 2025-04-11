using book.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace book.Data.Repositories
{
    public interface IRecipeRepository
    {
        Task<IEnumerable<Recipe>> GetAll(string? search = null, string? sortOrder = null);
        Task<Recipe?> GetById(int id);
        Task Add(Recipe recipe);
        Task Update(Recipe recipe);
        Task Delete(int id);
    }
}


