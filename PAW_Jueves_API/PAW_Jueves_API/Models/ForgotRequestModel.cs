using System.ComponentModel.DataAnnotations;

namespace PAW_Jueves_API.Models
{
    public class ForgotRequestModel
    {
        [Required]
        public string CorreoElectronico { get; set; } = string.Empty;
    }
}
