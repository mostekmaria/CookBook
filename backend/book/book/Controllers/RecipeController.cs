using Microsoft.AspNetCore.Mvc;
using book.Models;
using book.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace book.Controllers
{
    [ApiController]
    [Route("api/recipes")]
    public class RecipeController : ControllerBase
    {

        private readonly IRecipeService _recipeService;

        public RecipeController(IRecipeService recipeService)
        {
            _recipeService = recipeService;
        }

        //pobieranie wszystkich przepisów
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? search, [FromQuery] string? sortOrder)
        {
            var recipes = await _recipeService.GetAllRecipes(search, sortOrder);
            return Ok(recipes);
        }

        //wyszukiwanie po id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var recipe = await _recipeService.GetRecipeById(id);
            if (recipe == null) return NotFound();
            return Ok(recipe);
        }

        //tworzenie przepisu
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Recipe recipe)
        {
            await _recipeService.AddRecipe(recipe);
            return CreatedAtAction(nameof(GetById), new { id = recipe.Id }, recipe);
        }

        //aktualizacja przepisu
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Recipe updatedRecipe)
        {
            await _recipeService.UpdateRecipe(id, updatedRecipe);
            return NoContent();
        }

        //usuwanie przepisu
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _recipeService.DeleteRecipe(id);
            return NoContent();
        }
    }
}
