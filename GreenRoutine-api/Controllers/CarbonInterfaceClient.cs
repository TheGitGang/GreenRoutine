using RestSharp;
using System.Threading.Tasks;

public class CarbonInterfaceClient
{
    private readonly string _apiKey;
    private readonly RestClient _client;

    public CarbonInterfaceClient(string apiKey)
    {
        _apiKey = apiKey;
        _client = new RestClient("https://www.carboninterface.com/api/v1/");
    }

    public async Task<string> GetEmissionsAsync(string type, object data)
    {
        var request = new RestRequest("estimates", Method.Post);
        request.AddHeader("Authorization", $"Bearer {_apiKey}");
        request.AddHeader("Content-Type", "application/json");
        request.AddJsonBody(new { type = type, data = data });

        var response = await _client.ExecuteAsync(request);
        return response.Content;
    }

    public async Task<string> GetVehicleModelIdAsync()
    {
        var request = new RestRequest("vehicle_makes", Method.Get);
        request.AddHeader("Authorization", $"Bearer {_apiKey}");

        var response = await _client.ExecuteAsync(request);
        

        return "0e61d07d-91be-4298-bfa9-2f8de2cc3ae4"; 
    }
}
