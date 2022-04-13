using Microsoft.AspNetCore.Mvc;

using WebAppMVCPurchaseOrder.Models.PurchaseOrderDetailRepository;
using WebAppMVCPurchaseOrder.Services.PurchaseOrderDetailServices;

using Newtonsoft.Json;

namespace WebAppMVCPurchaseOrder.Controllers
{
    public class PurchaseOrderDetailController : Controller
    {
        private PurchaseOrderDetailServices purchaseOrderServices;
        
        public PurchaseOrderDetailController(PurchaseOrderDetailServices podServices)
        {
           this.purchaseOrderServices = podServices;
        }
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

            var status = this.purchaseOrderServices.UpdatePurchaseOrderDetail(pod);

            return Json(status);
        }

        [HttpPost]
        public IActionResult CancelPurchaseOrderDetail(string id)
        {

            var status = this.purchaseOrderServices.CancelPurchaseOrderDetail(id);

            return Json(status);
        }
    }
}
