using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class CarbonController : ControllerBase
{
    private readonly CarbonInterfaceClient _carbonClient;

    public CarbonController(CarbonInterfaceClient carbonClient)
    {
        _carbonClient = carbonClient;
    }

    [HttpPost("get-vehicle-emissions")]
    public async Task<IActionResult> GetVehicleEmissions([FromBody] EmissionRequest request)
    {
        if (request.Type != "vehicle")
        {
            return BadRequest("Invalid request type");
        }

        var result = await _carbonClient.GetEmissionsAsync(request.Type, request.Data);
        return Ok(result);
    }

}

// make conditional logic for getting the dat you need 
// git checkout development git pull 











