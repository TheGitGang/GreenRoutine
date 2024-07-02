
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace TodoApi;


public class CarbonInterFaceAPI
{  
    public int Id { get; set; }
        public string Vehicle_make { get; set; }
        public string Vehicle_model { get; set; }
       public string  Vehicle_year { get; set; }
 
    
    public CarbonInterFaceAPI (int id, string vehicle_make, string vehicle_model, string vehicle_year)
    {
        Id = id;
        Vehicle_make = vehicle_make;
        Vehicle_model = vehicle_model;
        Vehicle_year = vehicle_year;
    Console.WriteLine(Vehicle_make);
    Console.WriteLine(Vehicle_model);
    Console.WriteLine(Vehicle_year);
    Console.WriteLine(Id);
    }
}

      






