using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using GreenRoutine;
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
    public class ElectricityController : ControllerBase
    {
        private static readonly HttpClient client = new HttpClient();
        private const string apiKey = "11oVkRMXcMSHMlUmyTKrg";
        private const string baseUrl = "https://www.carboninterface.com/api/v1/";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ChallengeDbContext context;

        public ElectricityController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ChallengeDbContext dbContext)
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
            _userManager = userManager;
            _signInManager = signInManager;
            context = dbContext;
        }

        [HttpPost("get-estimate")]
        public async Task<ActionResult<ElectricityDTO>> GetEstimate([FromBody] ElectricityEstimateRequest estimateRequest)
        {
            if (estimateRequest == null)
            {
                return BadRequest("Invalid request payload");
            }

            try
            {
                var jsonRequest = JsonConvert.SerializeObject(estimateRequest);
                Console.WriteLine("POST Request JSON: " + jsonRequest); // Logging request
                var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync($"{baseUrl}estimates", content);

                if (response.IsSuccessStatusCode)
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("POST Response Body: " + responseBody); // Logging response

                    // Deserialize the response to match the new structure
                    var apiResponse = JsonConvert.DeserializeObject<ApiResponse>(responseBody);
                    var data = apiResponse.Data.Attributes;
                    return Ok(data);
                }
                else
                {
                    string responseBody = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("POST Error Response Body: " + responseBody); // Logging error response
                    return StatusCode((int)response.StatusCode, $"Request failed with status code: {response.StatusCode}, Response: {responseBody}");
                }
            }
            catch (HttpRequestException e)
            {
                return StatusCode(500, $"Error: {e.Message}");
            }
        }

        [HttpPost("store-estimate")]
        public async Task<ActionResult> StoreCarbon(ElectricityRequest carbonRequest)
        {
            if (carbonRequest == null)
            {
                return BadRequest("Invalid request payload");
            }

            try
            {
                var challengeCarbon = await context.UserChallenges.FirstOrDefaultAsync(uc => uc.UserId == carbonRequest.UserId && uc.ChallengeId == carbonRequest.ChallengeId);
                if (challengeCarbon == null)
                {
                    return NotFound("Electricity value not found");
                }

                challengeCarbon.Carbon_lb = carbonRequest.Carbon_lb;
                await context.SaveChangesAsync();
                return Ok(new { message = "Electricity impact successfully added" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        public class ElectricityEstimateRequest
        {
            [JsonProperty("type")]
            public string Type { get; set; } = "electricity";

            [JsonProperty("country")]
            public string Country { get; set; }

            [JsonProperty("state")]
            public string State { get; set; }

            [JsonProperty("electricity_value")]
            public double ElectricityValue { get; set; }

            [JsonProperty("electricity_unit")]
            public string ElectricityUnit { get; set; }
        }

        public class ApiResponse
        {
            [JsonProperty("data")]
            public ApiResponseData Data { get; set; }
        }

        public class ApiResponseData
        {
            [JsonProperty("id")]
            public string Id { get; set; }

            [JsonProperty("type")]
            public string Type { get; set; }

            [JsonProperty("attributes")]
            public ElectricityDTO Attributes { get; set; }
        }

        public class ElectricityDTO
        {

            [JsonProperty("id")]
            public string Id { get; set; }

            [JsonProperty("type")]
            public string Type { get; set; }

            [JsonProperty("country")]
            public string Country { get; set; }

            [JsonProperty("state")]
            public string State { get; set; }

            [JsonProperty("electricity_unit")]
            public string Electricity_Unit { get; set; }

            [JsonProperty("electricity_value")]
            public decimal Electricity_Value { get; set; }

            [JsonProperty("estimated_at")]
            public DateTime EstimatedAt { get; set; }

            [JsonProperty("carbon_g")]
            public double CarbonG { get; set; }

            [JsonProperty("carbon_lb")]
            public double CarbonLb { get; set; }

            [JsonProperty("carbon_kg")]
            public double CarbonKg { get; set; }

            [JsonProperty("carbon_mt")]
            public double CarbonMt { get; set; }
          public ElectricityDTO() { }
        
        
            public ElectricityDTO(string id, string type, string country, string state, string electricity_Unit, decimal electricity_Value, DateTime estimatedAt, double carbonG, double carbonLb, double carbonKg, double carbonMt)
            {
                Id = id;
                Type = type;
                Country = country;
                State = state;
                Electricity_Unit = electricity_Unit;
                Electricity_Value = electricity_Value;
                EstimatedAt = estimatedAt;
                CarbonG = carbonG;
                CarbonLb = carbonLb;
                CarbonKg = carbonKg;
                CarbonMt = carbonMt;
            }
        }


        public class ElectricityRequest
        {
            public double Carbon_lb { get; set; }
            public int ChallengeId { get; set; }
            public string UserId { get; set; }
        }
    }
}
