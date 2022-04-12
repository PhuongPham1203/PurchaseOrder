using Microsoft.AspNetCore.Mvc;
using WebAppMVCPurchaseOrder.Services.PurchaseOrderDetailServices;

namespace WebAppMVCPurchaseOrder.Controllers
{
    public class PurchaseOrderDetailController : Controller
    {
        private PurchaseOrderDetailServices purchaseOrderServices = new PurchaseOrderDetailServices();
        
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetPurchaseOrderDetail(string id)
        {
            var data = this.purchaseOrderServices.GetPurchaseOrderDetail(id);

            return Json(data);
        }

        [HttpPatch]
        public IActionResult UpdatePurchaseOrderDetail(string pod)
        {

            var status = this.purchaseOrderServices.UpdatePurchaseOrderDetail(pod);

            return Json(status);
        }

        [HttpPatch]
        public IActionResult CancelPurchaseOrderDetail(string id)
        {

            var status = this.purchaseOrderServices.CancelPurchaseOrderDetail(id);

            return Json(status);
        }
    }
}
