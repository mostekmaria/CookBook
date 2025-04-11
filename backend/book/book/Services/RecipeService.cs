using book.Models;
using book.Data.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace book.Services
{
    public class RecipeService : IRecipeService
    {
        private readonly IRecipeRepository _recipeRepository;
        private readonly IConfiguration _configuration;

        public RecipeService(IRecipeRepository recipeRepository, IConfiguration configuration)
        {
            _recipeRepository = recipeRepository;
            _configuration = configuration;
        }

        //dodawanie przepisu
        public async Task AddRecipe(Recipe recipe)
        {
            // sprawdzenie czy produkt o takiej nazwie istnieje
            var existingRecipe = (await _recipeRepository.GetAll())
                .FirstOrDefault(p => p.Name == recipe.Name);
            if (existingRecipe != null)
                throw new ArgumentException("Recipe with this name already exists");

            await _recipeRepository.Add(recipe);
        }

        //wyświetlanie wszystkich przepisów
        public async Task<IEnumerable<Recipe>> GetAllRecipes(string? search = null, string? sortOrder = null)
        {
            return await _recipeRepository.GetAll(search, sortOrder);
        }

        public async Task<Recipe?> GetRecipeById(int id)
        {
            return await _recipeRepository.GetById(id);
        }

        //aktualizacja przepisu
        public async Task UpdateRecipe(int id, Recipe updatedRecipe)
        {
            var existingRecipe = await _recipeRepository.GetById(id);
            if (existingRecipe == null)
                throw new KeyNotFoundException("This recipe already exists");

            // sprawdzenie czy produkt o takiej samej nazwie istnieje
            var otherRecipe = (await _recipeRepository.GetAll())
                .FirstOrDefault(p => p.Name == updatedRecipe.Name && p.Id != id);
            if (otherRecipe != null)
                throw new ArgumentException("Recipe with this name already exists");

            // aktualizacja produktu w bazie
            existingRecipe.Name = updatedRecipe.Name;
            existingRecipe.DateOfAdding = updatedRecipe.DateOfAdding;
            existingRecipe.Ingredients = updatedRecipe.Ingredients;
            existingRecipe.Instructions = updatedRecipe.Instructions;
            existingRecipe.PrepTime = updatedRecipe.PrepTime;
            existingRecipe.Vegan = updatedRecipe.Vegan;

            await _recipeRepository.Update(existingRecipe);
        }

        //usuwanie przepisu
        public async Task DeleteRecipe(int id)
        {
            var product = await _recipeRepository.GetById(id);
            if (product == null)
                throw new KeyNotFoundException("Recipe doeasn't exist");

            await _recipeRepository.Delete(id);
        }
    }
}



