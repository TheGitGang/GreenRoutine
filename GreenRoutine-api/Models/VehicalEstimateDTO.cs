namespace TodoApi.Models;

public class VehicalEstimateDTO
{
        public string? Type { get; set; }
        public string? Id { get; set; }
        public int? Distance_Value { get; set; }
        public int? Vehicle_Year { get; set; }
        public decimal Price { get; set; }
        public string? Vehicle_Model { get; set; }
        public string? Vehicle_Make { get; set; }
        public string?  Distance_Unit { get; set; }
        public int? Carbon_G { get; set; }
        public int? Carbon_Lb { get; set; }
        public int? Carbon_Kg { get; set; }
        public int? Carbon_Mt { get; set; }
        public string? Estimated_At { get; set; }
public VehicalEstimateDTO()
{
  
}
public VehicalEstimateDTO(string? type, string? id, int? distance_Value, int? vehicle_Year, decimal price, string? vehicle_Model, string? vehicle_Make, string? distance_Unit, int? carbon_G, int? carbon_Lb, int? carbon_Kg, int? carbon_Mt, string? estimated_At)
    {
        Type = type;
        Id = id;
        Distance_Value = distance_Value;
        Vehicle_Year = vehicle_Year;
        Price = price;
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
