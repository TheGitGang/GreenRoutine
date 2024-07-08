using System.Security.Claims;
using GreenRoutine;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;
using TodoApi.Server.Data;
using TodoApi.Server.Models;
using System;
using System.ComponentModel;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        public Guid _makeChoice;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (model == null)
            {
                return BadRequest("Invalid user data");
            }

            var user = new ApplicationUser
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                DateJoined = DateTime.Now,
                Leaves = 0,
                Bio = "",
                Pronouns = ""
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                return Ok(new { message = "User registered successfully" });
            }

            return BadRequest(result.Errors);
        }

        [HttpGet("IsUserAuthenticated")]
        public async Task<IActionResult> IsUserAuthenticated()
        {
            if (User.Identity.IsAuthenticated)
            {
                return Ok();
            }
            else
            {
                return Unauthorized(new { message = "User in not authenticated" });
            }
        }

        //Point System items
        [HttpPost("add-leaves")]
        public async Task<IActionResult> AddPoints([FromBody] AddPointsRequest request)
        {
            try
            {
                Console.WriteLine($"Received request to add points to user: {request.UserId}");
                var user = await _userManager.FindByIdAsync(request.UserId);
                if (user == null)
                {
                    throw new Exception("User not found");
                }

                user.Leaves += request.Points;
                var result = await _userManager.UpdateAsync(user);
                if (result.Succeeded)
                {
                    return Ok(user);
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        //temp class to test
        public class AddPointsRequest
        {
            public string UserId { get; set; }
            public int Points { get; set; }
        }

        [HttpPost("about")]
        public async Task<IActionResult> AddMake([FromBody] AddMakeRequest addMakeRequest)
        {
            try
            {
                Console.WriteLine($"Received request to add points to user: {addMakeRequest.Id}");
                var user = await _userManager.FindByIdAsync(addMakeRequest.Id);
                if (user == null)
                {
                    throw new Exception("User not found");
                }

                user.makeChoice = addMakeRequest.makeChoice;
                var result = await _userManager.UpdateAsync(user);
                // _makeChoice = addMakeRequest.makeChoice;
                if (result.Succeeded)
                {
                    return Ok(user);
                }
                else
                {
                    return BadRequest(result.Errors);
                }
        Console.WriteLine("hi");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }



        }

        /*public IActionResult RecordMake( /*[FromBody]*//*
            AddMakeRequest addMakeRequest
        )
        {
            Console.WriteLine(addMakeRequest.makeChoice.ToString());
            Console.WriteLine(addMakeRequest.makeChoice);
            _makeChoice = addMakeRequest.makeChoice;

            // context.Challenges.Add(challenge);
            // context.SaveChanges();
            return Ok(new { message = "Make successfully registered" });
        }*/

    [HttpGet("about2/{id}")]
    public async Task<ActionResult<VehicleModels>> GetModels(Guid id)
    {
        // var user = await _userManager.FindByIdAsync(userId);
        using (var httpClient = new HttpClient())
        {
        string apiUrl = "https://www.carboninterface.com/api/v1/vehicle_makes/" + id.ToString() + "/vehicle_models";
        Console.WriteLine(_makeChoice);
        var request = new HttpRequestMessage(HttpMethod.Get, apiUrl);

        // Add headers to the request
        request.Headers.Add("Authorization", "Bearer z0UbMhCEGZ0XtyG5S4pLA");
        try
        {
            HttpResponseMessage response = await httpClient.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                string json = await response.Content.ReadAsStringAsync();
                List<VehicleModels> data = JsonConvert.DeserializeObject<List<VehicleModels>>(json);
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
        }
    }


        public class AddMakeRequest
        {
            public Guid makeChoice { get; set; }
            public string Id { get; set;}
        }
    }
}
