using Microsoft.AspNetCore.Mvc;
using WebAppApiPO.Interfaces.Models;
using WebAppApiPO.Models.Context;

namespace WebAppApiPO.Controllers
{
    [ApiController]
    [Route("WeatherForecast")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

       

        [HttpGet("getall")]
        public IActionResult All()
        {
            var data = new Part
            {
                Id = 1,
                PartNumber = "1asd",

            };

            return Ok(data);
        }

        [HttpGet("getitem/{id}")]
        public IActionResult GetItem(int id)
        {
            

            return Ok(id);
        }

        /*
         * [HttpGet("{id}")]
         * 
         * 
         * 
         */
    }
}