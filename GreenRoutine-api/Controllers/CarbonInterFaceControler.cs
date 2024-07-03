﻿
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace TodoApi.Controllers;
 [ApiController]
    [Route("[controller]")]

public class CarbonInterFaceController : ControllerBase
{  
    
private static readonly HttpClient client = new HttpClient();

    public static async Task<string> GetCarbonDataAsync(string apiKey)
    {
        client.DefaultRequestHeaders.Accept.Clear();
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        client.DefaultRequestHeaders.Add("Authorization", "Bearer 11oVkRMXcMSHMlUmyTKrg");

        try
        {
            HttpResponseMessage response = await client.GetAsync("https://www.carboninterface.com/api/v1/vehicle_makes");
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            return responseBody;
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine($"Error: {e.Message}");
            return null;
        }
    }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            string apiKey = "11oVkRMXcMSHMlUmyTKrg";
            var result = await GetCarbonDataAsync(apiKey);
            if (result != null)
            {
                return Ok(result);
            }
            return StatusCode(500, "An error occurred while fetching data");
        }
    }
// }







