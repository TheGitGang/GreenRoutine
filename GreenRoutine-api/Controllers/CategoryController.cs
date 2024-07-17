using GreenRoutine;
using GreenRoutine.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace TodoAPI.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase {
         private readonly ChallengeDbContext context;

        public CategoryController(ChallengeDbContext challengeDbContext) 
        {
            context = challengeDbContext;
        }

        [HttpPost("create")]
        public IActionResult CreateCategory(CreateCategoryDto category)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var Category = new Category
            {
                Name = category.Name
            };
                Console.WriteLine("you added a category");
                context.Categories.Add(Category);
                context.SaveChanges();
                return Ok(new {message="Category successfully added"});
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<CreateCategoryDto>>> GetCategories()
        {
            return await 
                context.Categories
                .Select(c => new CreateCategoryDto(c.Name))
                .ToListAsync();
        }

    }
    public class CreateCategoryDto
    {
        public string Name { get; set;}
        public CreateCategoryDto(string? name)
        {
            Name = name;
        }
    }

}