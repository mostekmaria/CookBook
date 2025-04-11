using book.Services;
using Microsoft.AspNetCore.Mvc;

namespace book.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExternalRecipesController : ControllerBase
    {
        private readonly ExternalRecipeService _externalService;

        public ExternalRecipesController(ExternalRecipeService externalService)
        {
            _externalService = externalService;
        }

        //wyszukiwanie wśród przepisów takich które zgadzają się z nazwą
        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] string query)
        {
            var result = await _externalService.SearchRecipesAsync(query);
            return Ok(result);
        }
    }
}
