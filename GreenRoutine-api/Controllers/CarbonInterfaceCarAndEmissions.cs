using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using TodoApi.Models;
namespace TodoApi;

public class CarbonInterfaceCarAndEmissions: ControllerBase
{

        [HttpPost]
        public ActionResult GetCarDetails([FromBody] VehicalEstimateDTO vehicalEstimate)
        {
            if (vehicalEstimate == null)
            {
                return BadRequest("Invalid data");
            }

            var carType = $"{vehicalEstimate.Vehicle_Make} {vehicalEstimate.Vehicle_Model} {vehicalEstimate.Vehicle_Year}";
            var carbonLb = vehicalEstimate.Carbon_Lb;

            return Ok(new { CarType = carType, CarbonLb = carbonLb });
        }
    }

