using System.ComponentModel.DataAnnotations;

namespace TodoApi.Server.Models
{ public class AddModelRequest
    {
        public Guid modelChoice { get; set; }
        public string Id { get; set;}
    }
}