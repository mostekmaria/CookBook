using book.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace book.Services
{
    public interface IRecipeService
    {
        Task<IEnumerable<Recipe>> GetAllRecipes(string? search = null, string? sortOrder = null);
        Task<Recipe?> GetRecipeById(int id);
        Task AddRecipe(Recipe recipe);
        Task UpdateRecipe(int id, Recipe updatedRecipe);
        Task DeleteRecipe(int id);
    }
}
