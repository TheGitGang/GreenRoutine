using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;

namespace TodoApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CarbonInterFaceController : ControllerBase
{

        private static readonly HttpClient client = new HttpClient();
        private const string apiKey = "11oVkRMXcMSHMlUmyTKrg";
        private const string baseUrl = "https://www.carboninterface.com/api/v1/";

        public CarbonInterFaceController()
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
        }

      [HttpPost("get-estimate")]
        public async Task<IActionResult> GetEstimate([FromBody] VehicleEstimateRequest estimateRequest)
        {
            if (estimateRequest == null)
            {
                return BadRequest("Invalid request payload");
            }


            try
            {
                //  client.DefaultRequestHeaders.Clear();
                // client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");
                var content = new StringContent(JsonConvert.SerializeObject(estimateRequest), Encoding.UTF8, "application/json");
                HttpResponseMessage response = await client.PostAsync($"{baseUrl}estimates", content);

                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();
                return Ok(responseBody);
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine($"Error: {e.Message}");
                return StatusCode(500, "An error occurred while fetching data");
            }
        }
}