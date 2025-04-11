using book.Dtos;
using book.Models.External;

namespace book.Services
{
    public class ExternalRecipeService
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly IConfiguration _config;

        public ExternalRecipeService(IHttpClientFactory clientFactory, IConfiguration config)
        {
            _clientFactory = clientFactory;
            _config = config;
        }

        //wyszukiwanie przepisó z API
        public async Task<List<RecipeDto>> SearchRecipesAsync(string query)
        {
            var apiKey = _config["Spoonacular:ApiKey"];
            var client = _clientFactory.CreateClient();

            var searchUrl = $"https://api.spoonacular.com/recipes/complexSearch?query={query}&number=5&apiKey={apiKey}";
            var searchResponse = await client.GetAsync(searchUrl);

            if (!searchResponse.IsSuccessStatusCode)
                return new();

            var searchContent = await searchResponse.Content.ReadFromJsonAsync<SpoonacularSearchResult>();
            var recipes = new List<RecipeDto>();

            foreach (var result in searchContent.Results)
            {
                    var infoUrl = $"https://api.spoonacular.com/recipes/{result.Id}/information?includeNutrition=false&apiKey={apiKey}";
                    var infoResponse = await client.GetAsync(infoUrl);

                if (!infoResponse.IsSuccessStatusCode) continue;

                var info = await infoResponse.Content.ReadFromJsonAsync<SpoonacularRecipeDetail>();

                recipes.Add(new RecipeDto
                {
                    Id = info.Id,
                    Name = info.Title,
                    Ingredients = string.Join(", ", info.ExtendedIngredients.Select(i => i.Original)),
                    Instructions = info.Instructions ?? "No directions",
                    PrepTime = info.ReadyInMinutes,
                    Image = info.Image,
                    Vegan = info.Vegan
                });
            }

            return recipes;
        }
    }
}
