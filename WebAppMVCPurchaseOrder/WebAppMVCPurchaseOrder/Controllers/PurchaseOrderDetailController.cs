using Microsoft.AspNetCore.Mvc;

using WebAppMVCPurchaseOrder.Models.PurchaseOrderDetailRepository;
using WebAppMVCPurchaseOrder.Services.PurchaseOrderDetailServices;

using Newtonsoft.Json;

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

        [HttpPost]
        public IActionResult UpdatePurchaseOrderDetail(string pod)
        {

            string status = this.purchaseOrderServices.UpdatePurchaseOrderDetail(pod);

            return Json(status);
        }
    }
}
