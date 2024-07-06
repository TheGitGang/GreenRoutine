using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
namespace TodoApi;

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
