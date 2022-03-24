using Microsoft.AspNetCore.Mvc;
using WebAppMVCPurchaseOrder.Services.PurchaseOrderDetailServices;
using WebAppMVCPurchaseOrder.Services.PurchaseOrderServices;

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
            int index = 0;
            if (id != null && int.Parse(id)>0)
            {
                index = int.Parse(id);
            }
            else
            {
                return Json(null);
            }

            var data = this.purchaseOrderServices.GePurchaseOrderDetail(index);

            return Json(data);
        }


    }
}
