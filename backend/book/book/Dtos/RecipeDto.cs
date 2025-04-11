namespace book.Dtos
{
    public class RecipeDto
    {
        // struktura przepisu który chcemy dodać do naszej książki
        public int Id { get; set; }             
        public string Name { get; set; }        
        public string Ingredients { get; set; } 
        public string Instructions { get; set; }
        public int PrepTime { get; set; }       
        public string Image { get; set; }       

        public bool Vegan { get; set; }
    }

}
