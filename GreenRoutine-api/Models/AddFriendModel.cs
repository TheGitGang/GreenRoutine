using System.ComponentModel.DataAnnotations;

namespace TodoApi.Server.Models
{
    public class AddFriendModel
    {
        public string UserId { get; set; }
        public string FriendUsername { get; set; }
    }
}