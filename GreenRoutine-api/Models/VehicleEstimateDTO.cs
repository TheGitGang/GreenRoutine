
﻿namespace TodoApi.Models
{
    public class VehicleEstimateDTO
    {
        public string? Type { get; set; }
        public string? Id { get; set; }
        public double? Distance_Value { get; set; }
        public int? Vehicle_Year { get; set; }
        public string? Vehicle_Model { get; set; }
        public string? Vehicle_Make { get; set; }
        public string? Distance_Unit { get; set; }
        public double? Carbon_G { get; set; }
        public double? Carbon_Lb { get; set; }
        public double? Carbon_Kg { get; set; }
        public double? Carbon_Mt { get; set; }
        public DateTime? Estimated_At { get; set; }

        public VehicleEstimateDTO() { }

        public VehicleEstimateDTO(string? type, string? id, double? distance_Value, int? vehicle_Year, string? vehicle_Model, string? vehicle_Make, string? distance_Unit, double? carbon_G, double? carbon_Lb, double? carbon_Kg, double? carbon_Mt, DateTime? estimated_At)
        {
            Type = type;
            Id = id;
            Distance_Value = distance_Value;
            Vehicle_Year = vehicle_Year;
            Vehicle_Model = vehicle_Model;
            Vehicle_Make = vehicle_Make;
            Distance_Unit = distance_Unit;
            Carbon_G = carbon_G;
            Carbon_Lb = carbon_Lb;
            Carbon_Kg = carbon_Kg;
            Carbon_Mt = carbon_Mt;
            Estimated_At = estimated_At;
        }
    }
}

