namespace GreenRoutine;

public class VehicleModels
{

    public VehicleModelData Data { get; set; }

    // public string Img { get; set; }
    
}

public class VehicleModelData
{
    public Guid Id { get; set; }
    public string Type { get; set; }
    public VehicleModelAttributes Attributes { get; set; }
}

public class VehicleModelAttributes
{
    public string Name { get; set; }
    public int Year { get; set; }
}