using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WebAppMVCPurchaseOrder.Models;
using WebAppMVCPurchaseOrder.Services.PurchaseOrderServices;

namespace WebAppMVCPurchaseOrder.Controllers
{
    public class PurchaseOrderController : Controller
    {

        private PurchaseOrderServices purchaseOrderServices = new PurchaseOrderServices();

        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public IActionResult GetListPurchaseOrder(string id)
        {
            int index = 0;
            if (id != null)
            {
                index = int.Parse(id);
            }


            var data = this.purchaseOrderServices.GetListPurchaseOrder(index,10);

            return Json(data);
        }

    }
}