using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WebAppMVCPurchaseOrder.Models;
using WebAppMVCPurchaseOrder.Services.PurchaseOrderServices;

namespace WebAppMVCPurchaseOrder.Controllers
{
    public class PurchaseOrderController : Controller
    {


        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
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

            PurchaseOrderServices purchaseOrderServices = new PurchaseOrderServices();

            var data = purchaseOrderServices.GetListPurchaseOrder(index,10);

            return Json(data);
        }

    }
}