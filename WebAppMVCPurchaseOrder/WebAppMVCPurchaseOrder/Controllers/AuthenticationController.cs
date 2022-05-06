using Microsoft.AspNetCore.Mvc;
using WebAppMVCPurchaseOrder.Interfaces.Services;
using WebAppMVCPurchaseOrder.Models.AccountRepository;
using WebAppMVCPurchaseOrder.Models.Context;

namespace WebAppMVCPurchaseOrder.Controllers
{
    [Route("[controller]/")]
    public class AuthenticationController : Controller
    {
        private IAccountServices _accountService;

        public AuthenticationController(IAccountServices accountServices)
        {
            this._accountService = accountServices;
        }

        // GET: AuthenticationController
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            try
            {
                var userModel = await this._accountService.Login(user);
                
                return Ok(userModel);
            }catch(Exception ex)
            {
                return BadRequest(ex);
            }

        }

        [HttpPost("checktoken")]
        public async Task<IActionResult> CheckToken([FromBody] UserModel user)
        {
            try
            {
                var userModel = await this._accountService.CheckToken(user.Token);
                return Ok(userModel);
            }catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
