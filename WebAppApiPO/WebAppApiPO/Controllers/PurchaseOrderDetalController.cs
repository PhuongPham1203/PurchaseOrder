using Microsoft.AspNetCore.Mvc;
using WebAppApiPO.Services.PODetailServices;

namespace WebAppApiPO.Controllers
{
    [ApiController]
    [Route("PurchaseOrderDetail")]

    public class PurchaseOrderDetalController : ControllerBase
    {
        private PODetailServices purchaseOrderServices;
        public PurchaseOrderDetalController(PODetailServices pODetailServices)
        {
            this.purchaseOrderServices = pODetailServices;
            
        }

        [HttpGet("GetPurchaseOrderDetail/{id}")]
        public IActionResult GetPurchaseOrderDetail(int id)
        {
            var data = this.purchaseOrderServices.GetPurchaseOrderDetail(id);

            return Ok(data);
        }

        [HttpPatch("UpdatePurchaseOrderDetail")]
        public IActionResult UpdatePurchaseOrderDetail([FromBody]string pod)
        {

            //var status = this.purchaseOrderServices.UpdatePurchaseOrderDetail(pod);

            return Ok(pod);
        }

        [HttpPatch("CancelPurchaseOrderDetail")]
        public IActionResult CancelPurchaseOrderDetail(string id)
        {

            var status = this.purchaseOrderServices.CancelPurchaseOrderDetail(id);

            return Ok(status);
        }

    }
}
