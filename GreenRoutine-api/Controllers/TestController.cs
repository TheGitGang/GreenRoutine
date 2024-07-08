using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
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
    /*[HttpGet]
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
        
    }*/

    [HttpPost]
    public async Task<ActionResult<ElectricityModel>> Post()
    {
        string url = "https://www.carboninterface.com/api/v1/estimates";
        Console.WriteLine(url);
        var headers = new Dictionary<string, string>
        {
            { "Authorization", "Bearer z0UbMhCEGZ0XtyG5S4pLA" },
            { "Accept", "application/json" }
        };

        string jsonBody =
            "{\"type\":\"electricity\", \"electricity_unit\":\"mwh\", \"electricity_value\":42, \"country\":\"us\", \"state\":\"fl\"}";

        Console.WriteLine("made it1");
        using (var httpClient = new HttpClient())
        {
            foreach (var header in headers)
            {
                httpClient.DefaultRequestHeaders.Add(header.Key, header.Value);
            }
            var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");
            try
            {
                Console.WriteLine("made it2");
                HttpResponseMessage response = await httpClient.PostAsync(url, content);
                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine("made it3");
                    string responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(responseBody);

                    var data = JsonConvert.DeserializeObject<ElectricityModel>(responseBody);

                    Console.WriteLine(data);
                    // Console.WriteLine(data.ElectricityData.Id);
                    return Ok(data);
                    // Console.WriteLine("Response: " + responseBody);
                } /*
                else
                {
                    return StatusCode(
                        (int)response.StatusCode,
                        "Error fetching data from external API"
                    );
                    // return "error";
                    // Console.WriteLine("Error: " + response.StatusCode);
                }*/
            }
            catch (HttpRequestException e)
            {
                return StatusCode(500, $"Internal server error: {e.Message}");
                // return StatusCode(
                // (int)response.StatusCode,
                // "Error fetching data from external API");
                // Console.WriteLine("HTTP Request Exception: " + e.Message);
            }
        }
        return StatusCode(500, $"Internal server error: ");
    }

    /*
    try
    {
        HttpResponseMessage response = await _httpClient.PostAsync(url);

        if (response.IsSuccessStatusCode)
        {
            string json = await response.Content.ReadAsStringAsync();
            ComicModel data = JsonConvert.DeserializeObject<ComicModel>(json);
            return Ok(data);
        }
        else
        {
            return StatusCode(
                (int)response.StatusCode,
                "Error fetching data from external API"
            );
        }
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}*/

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
