using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarbonInterfaceController : ControllerBase
    {
        private static readonly HttpClient client = new HttpClient();
        private const string apiKey = "11oVkRMXcMSHMlUmyTKrg";
        private const string baseUrl = "https://www.carboninterface.com/api/v1/";

        public CarbonInterfaceController()
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json")
            );
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
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
            string apiKey = "11oVkRMXcMSHMlUmyTKrg";
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
        }

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
    }
}
