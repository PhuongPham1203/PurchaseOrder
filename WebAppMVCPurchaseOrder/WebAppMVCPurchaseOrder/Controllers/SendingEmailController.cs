using Microsoft.AspNetCore.Mvc;
using WebAppMVCPurchaseOrder.Services.PurchaseOrderDetailServices;
using WebAppMVCPurchaseOrder.Services.PurchaseOrderServices;
using WebAppMVCPurchaseOrder.Services.SendEmailServices;

namespace WebAppMVCPurchaseOrder.Controllers
{
    public class SendingEmailController : Controller
    {
        private SendEmailServices sendEmailServices;
        public SendingEmailController(SendEmailServices seServices)
        {
            sendEmailServices = seServices;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetSendEmailDetail(string id)
        {
            var data = this.sendEmailServices.GetEmailDetail(id);

            return Json(data);
        }

        [HttpPost]
        public IActionResult PostSendEmailDetail(string emailDetail)
        {
            var data = sendEmailServices.UpdateEmailDetail(emailDetail);
            return Json(data);
        }
    }
}
