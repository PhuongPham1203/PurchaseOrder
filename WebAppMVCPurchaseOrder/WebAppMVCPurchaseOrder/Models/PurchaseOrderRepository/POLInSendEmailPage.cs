using WebAppMVCPurchaseOrder.Models.Context;

namespace WebAppMVCPurchaseOrder.Models.PurchaseOrderRepository
{
    public class POLInSendEmailPage:IModel
    {
        public int? QtyOrdered { get; set; }
        public double? M2BuyPrice { get; set; }
        public string? PartNumber { get; set; }
    }
}
