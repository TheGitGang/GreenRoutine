namespace GreenRoutine;

public class ElectricityModel
{

    public ElectricityData Data { get; set; }

    // public string Img { get; set; }
    
}

public class ElectricityData
{
    public Guid Id { get; set; }
    public string Type { get; set; }
    public ElectricityAttributes Attributes { get; set; }
}

public class ElectricityAttributes
{
    public string Country{ get; set; }
    public string State{ get; set; }
    public string Electricity_unit{ get; set; }
    public double Electricity_value{ get; set; }
    public DateTime estimated_at { get; set; }
    public double carbon_g{ get; set; }
    public double carbon_lb{ get; set; }
    public double carbon_kg{ get; set; }
    public double carbon_mt{ get; set; }
}