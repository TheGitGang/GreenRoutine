using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace GreenRoutine.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public TestController(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }


    //Get /api/test
    [HttpGet]
    public async Task<ActionResult<ComicModel>> Get()
    {
        string apiUrl = "https://xkcd.com/info.0.json";

        try
        {
            HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                ComicModel data = JsonConvert.DeserializeObject<ComicModel>(json);
                return Ok(data);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Error fetching data from external API");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
        
    }

    // //GET /api/test/{id}
    // [HttpGet("{id}")]
    // [ProducesResponseType<string>(StatusCodes.Status200OK)]
    // [ProducesResponseType(StatusCodes.Status404NotFound)]
    // public IResult Get(int id)
    // {
    //     if (id < 0 || id >= _quotes.Length)
    //     {
    //         return Results.NotFound("These are not the droids you are looking for.");
    //     }
    //     return Results.Ok(_quotes[id]);
    // }
}
