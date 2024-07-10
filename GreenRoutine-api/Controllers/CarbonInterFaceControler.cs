using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;  // Add this import for JSON parsing

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarbonInterfaceController : ControllerBase
    {
        private static readonly HttpClient client = new HttpClient
        {
            BaseAddress = new Uri("https://www.carboninterface.com/"),
        };

        static CarbonInterfaceController()
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        // GET: api/CarbonInterface/vehicle_makes
        [HttpGet("vehicle_makes")]
        public async Task<IActionResult> GetVehicleMakes()
        {
            string apiKey = "11oVkRMXcMSHMlUmyTKrg";
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            HttpResponseMessage response = await client.GetAsync("api/v1/vehicle_makes");
            if (response.IsSuccessStatusCode)
            {
                string responseBody = await response.Content.ReadAsStringAsync();
                return Content(responseBody, "application/json"); // Explicitly set content type
            }
            else
            {
                return StatusCode((int)response.StatusCode, $"Request failed with status code: {response.StatusCode}");
            }
        }
    }
}
