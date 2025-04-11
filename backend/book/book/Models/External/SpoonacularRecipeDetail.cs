namespace book.Models.External
{
    //struktura danych przepisów z API
    public class SpoonacularRecipeDetail
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int ReadyInMinutes { get; set; }
        public string Instructions { get; set; }
        public string Image { get; set; }
        public bool Vegan { get; set; }
        public List<ExtendedIngredient> ExtendedIngredients { get; set; }
    }

    //klasa składnika z przepisu z api
    public class ExtendedIngredient
    {
        public string Original { get; set; }
    }
}
