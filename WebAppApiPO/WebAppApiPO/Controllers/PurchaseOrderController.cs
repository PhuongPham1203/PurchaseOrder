using Microsoft.AspNetCore.Mvc;
using WebAppApiPO.Services.POServices;

namespace WebAppApiPO.Controllers
{

    [ApiController]
    [Route("PurchaseOrder")]
    public class PurchaseOrderController : Controller
    {
        private POServices purchaseOrderServices;

        public PurchaseOrderController(POServices poServices)
        {
            this.purchaseOrderServices = poServices;
        }

        [HttpGet("GetListPurchaseOrder/{index}")]
        public IActionResult GetListPurchaseOrder(int index)
        {

            var data = this.purchaseOrderServices.GetListPurchaseOrder(index, 10);

            return Json(data);
        }
    }
}
