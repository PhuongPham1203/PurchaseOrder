using Microsoft.AspNetCore.Mvc;
using WebAppApiPO.Services.PODetailServices;

namespace WebAppApiPO.Controllers
{
    [ApiController]
    [Route("PurchaseOrderDetail")]

    public class PurchaseOrderDetailController : Controller
    {
        private PODetailServices purchaseOrderServices;
        public PurchaseOrderDetailController(PODetailServices pODetailServices)
        {
            this.purchaseOrderServices = pODetailServices;
            
        }

        [HttpGet("GetPurchaseOrderDetail/{id}")]
        public IActionResult GetPurchaseOrderDetail(int id)
        {
            var data = this.purchaseOrderServices.GetPurchaseOrderDetail(id);
            
            return Json(data);
        }

        [HttpPatch("UpdatePurchaseOrderDetail")]
        public IActionResult UpdatePurchaseOrderDetail(string pod)
        {

            //var status = this.purchaseOrderServices.UpdatePurchaseOrderDetail(pod);

            return Json(pod);
        }

        [HttpPatch("CancelPurchaseOrderDetail")]
        public IActionResult CancelPurchaseOrderDetail(string id)
        {

            var status = this.purchaseOrderServices.CancelPurchaseOrderDetail(id);

            return Json(status);
        }

    }
}
