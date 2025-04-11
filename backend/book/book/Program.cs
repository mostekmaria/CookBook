
using book.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using book.Data;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using book.Services;
using book.Data.Repositories;


namespace book
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            //var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            //kontekst bazy
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Add services to the container.

            builder.Services.AddScoped<IRecipeRepository, RecipeRepository>();
            builder.Services.AddScoped<IRecipeService, RecipeService>();
            builder.Services.AddHttpClient();
            builder.Services.AddScoped<ExternalRecipeService>();

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();

            //rejestracja CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend",
                    policy => policy.WithOrigins("http://localhost:5173")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod());
            });

            var app = builder.Build();

            app.UseHttpsRedirection();
            app.UseCors("AllowFrontend");

            app.MapControllers();

            app.Run();
        }
    }
}
