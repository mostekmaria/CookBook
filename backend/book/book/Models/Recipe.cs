using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace book.Models
{
    public class Recipe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        //model danych przepisu 
        public int Id { get; set; }

        [Required(ErrorMessage = "Name of the recipe is required")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Length of the recipe name should be between 3 and 20")]
        [RegularExpression(@"^[\p{L}\s\-'\d]+$", ErrorMessage = "Name should only contain letters, numbers, spaces and dashes")]
        public string Name { get; set; } = string.Empty;

        public DateTime DateOfAdding { get; set; } = DateTime.UtcNow;

        [Required(ErrorMessage = "Ingredients are required")]
        public string Ingredients { get; set; }

        public string Instructions { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Time should be a positive number")]
        public int PrepTime { get; set; }

        public bool Vegan { get; set; }
    }
}
