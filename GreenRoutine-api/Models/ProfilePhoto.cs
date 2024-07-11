using TodoApi.Server.Data;

namespace GreenRoutine.Models
{
    public class ProfilePhoto
    {
        public int Id { get; set; }
        public byte[]? Photo { get; set; }
        public string ContentType { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        
    }
}