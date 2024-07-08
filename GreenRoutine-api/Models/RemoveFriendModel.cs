using System.ComponentModel.DataAnnotations;

namespace TodoApi.Server.Models
{
    public class RemoveFriendModel
    {
        public string UserId { get; set; }
        public string FriendId { get; set; }
    }
}