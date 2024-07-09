namespace GreenRoutine;

public class VehicleMakes
{

    public VehicleData Data { get; set; }

    // public string Img { get; set; }
    
}

public class VehicleData
{
    public Guid Id { get; set; }
    public string Type { get; set; }
    public VehicleAttributes Attributes { get; set; }
}

public class VehicleAttributes
{
    public string Name { get; set; }
    public int Number_of_models { get; set; }
}