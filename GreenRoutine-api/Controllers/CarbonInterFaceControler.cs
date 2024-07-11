using System;
using System.Net.Http;
using System.Net.Http.Headers;

using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarbonInterfaceController : ControllerBase
    {
        private static readonly HttpClient client = new HttpClient();

        public CarbonInterfaceController()
        {
            // Set the base address and default headers for HttpClient
            client.BaseAddress = new Uri("https://www.carboninterface.com/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        // GET: api/CarbonInterface/vehicle_makes
        [HttpGet("vehicle_makes")]
        public async Task<IActionResult> GetVehicleMakes()
        {
            // Replace 'your_api_key_here' with your actual API key
            string apiKey = "11oVkRMXcMSHMlUmyTKrg";
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            HttpResponseMessage response = await client.GetAsync("api/v1/vehicle_makes");
            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                return Ok(responseBody);
            }
            else
            {
                return StatusCode((int)response.StatusCode, $"Request failed with status code: {response.StatusCode}");
            }
        }
    }
}


