using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using GreenRoutine;
using GreenRoutine.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TodoApi.Models;
using TodoApi.Server.Data;
using TodoApi.Server.Models;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarbonInterfaceController : ControllerBase
    {
        private static readonly HttpClient client = new HttpClient();
        private const string apiKey = "z0UbMhCEGZ0XtyG5S4pLA";
        private const string baseUrl = "https://www.carboninterface.com/api/v1/";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        private readonly ChallengeDbContext context;

        public CarbonInterfaceController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ChallengeDbContext dbContext
        )
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json")
            );
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
            _userManager = userManager;
            _signInManager = signInManager;
            context = dbContext;
            // Set the base address and default headers for HttpClient
            /*client.BaseAddress = new Uri("https://www.carboninterface.com/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));*/
        }

        // GET: api/CarbonInterface/vehicle_makes
        [HttpGet("vehicle_makes")]
        public async Task<IActionResult> GetVehicleMakes()
        {
            // Replace 'your_api_key_here' with your actual API key
            string apiKey = "z0UbMhCEGZ0XtyG5S4pLA";
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(
                "Bearer",
                apiKey
            );

            HttpResponseMessage response = await client.GetAsync("api/v1/vehicle_makes");
            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                return Ok(responseBody);
            }
            else
            {
                return StatusCode(
                    (int)response.StatusCode,
                    $"Request failed with status code: {response.StatusCode}"
                );
            }
        }

        [HttpPost("get-estimate")]
        public async Task<ActionResult<VehicleEstimateDTO>> GetEstimate(
            [FromBody] VehicleEstimateRequest estimateRequest
        )
        {
            if (estimateRequest == null)
            {
                return BadRequest("Invalid request payload");
            }
            try
            {
                client.DefaultRequestHeaders.Clear();
                client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
                var content = new StringContent(
                    JsonConvert.SerializeObject(estimateRequest),
                    Encoding.UTF8,
                    "application/json"
                );
                HttpResponseMessage response = await client.PostAsync(
                    $"{baseUrl}estimates",
                    content
                );
                // Console.WriteLine(response);

                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();
                // Console.WriteLine(responseBody);
                VehicleEstimateDTO data = JsonConvert.DeserializeObject<VehicleEstimateDTO>(
                    responseBody
                );
                // Console.WriteLine(data.Id);
                return Ok(responseBody);
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine($"Error: {e.Message}");
                return StatusCode(500, "An error occurred while fetching data");
            }
        }

        [HttpPost("store-estimate")]
        public async Task<ActionResult> StoreCarbon( /*[FromBody]*/
            CarbonRequest carbonRequest
        )
        {
            Console.WriteLine("you are adding a carbon impact");
            // context.Challenges.Add(challenge);
            /*var challengeCarbon = await context
                .UserChallenges.Where(uc => uc.UserId == userChallenge.UserId)
                .Where(uc => uc.ChallengeId == userChallenge.ChallengeId);*/
            var challengeCarbon = await context
                .UserChallenges.FirstOrDefaultAsync(uc => uc.UserId == carbonRequest.UserId && uc.PersonalChallengeId == carbonRequest.ChallengeId);
                Console.WriteLine(challengeCarbon);
            challengeCarbon.Carbon_lb = carbonRequest.Carbon_lb;
            if (challengeCarbon == null)
            {
                return NotFound("Carbon value not found");
            }
            context.SaveChanges();
            return Ok(new { message = "Carbon impact successfully added" });
        }

        /* [HttpPost("get-estimate")]
         public async Task<IActionResult> GetEstimate(
             [FromBody] VehicleEstimateRequest estimateRequest
         )
         {
             if (estimateRequest == null)
             {
                 return BadRequest("Invalid request payload");
             }
             try
             {
                  client.DefaultRequestHeaders.Clear();
                 client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
                 var content = new StringContent(
                     JsonConvert.SerializeObject(estimateRequest),
                     Encoding.UTF8,
                     "application/json"
                 );
                 HttpResponseMessage response = await client.PostAsync(
                     $"{baseUrl}estimates",
                     content
                 );
                 Console.WriteLine(response);
 
                 response.EnsureSuccessStatusCode();
                 string responseBody = await response.Content.ReadAsStringAsync();
                 Console.WriteLine(responseBody);
                 return Ok(responseBody);
             }
             catch (HttpRequestException e)
             {
                 Console.WriteLine($"Error: {e.Message}");
                 return StatusCode(500, "An error occurred while fetching data");
             }
         }*/

        public class VehicleEstimateRequest
        {
            [JsonProperty("type")]
            public string Type { get; set; } = "vehicle";

            [JsonProperty("distance_unit")]
            public string DistanceUnit { get; set; }

            [JsonProperty("distance_value")]
            public double DistanceValue { get; set; }

            [JsonProperty("vehicle_model_id")]
            public string VehicleModelId { get; set; }
        }
        public class CarbonRequest
        {
            public double Carbon_lb { get; set; }
            public int ChallengeId { get; set; }
            public string UserId { get; set; }
        }
    }
}
