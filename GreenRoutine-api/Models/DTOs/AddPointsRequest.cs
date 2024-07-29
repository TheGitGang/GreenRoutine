
using System.ComponentModel.DataAnnotations;

namespace TodoApi.Server.Models
{
public class AddPointsRequest
        {
            public string UserId { get; set; }
            public int Points { get; set;}
        }
}