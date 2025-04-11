namespace book.Models.External
{
    public class SpoonacularSearchResult
    {
        public List<SpoonacularRecipeShort> Results { get; set; }
    }

    public class SpoonacularRecipeShort
    {
        public int Id { get; set; }
        public string Title { get; set; }
    }
}
