namespace TodoApi.Models;

public class VehicalEstimateDTO
{
  public class VehicalDto
    {
        public string type { get; set; }
        public string Id { get; set; }
        public int distance_value { get; set; }
        public int vehicle_year { get; set; }
        public decimal Price { get; set; }
        public string vehicle_model { get; set; }
        public string vehicle_make { get; set; }
        public string  distance_unit { get; set; }
        public int carbon_g { get; set; }
        public int carbon_lb { get; set; }
        public int carbon_kg { get; set; }
        public int carbon_mt { get; set; }
        public string vehicle_model_id { get; set; }
        public string estimated_at { get; set; }
    }
}
