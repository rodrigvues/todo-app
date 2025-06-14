using System.Text.Json.Serialization;

namespace TodoApi.Models
{
    
    public class Todo
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        [JsonPropertyName("completed")]

        public bool IsDone { get; set; }
    }
}
