using WebAppMVCPurchaseOrder.Models.Context;

namespace WebAppMVCPurchaseOrder.Models.PurchaseOrderDetailRepository
{
    public class POLInPurchaseOrderDetailPage:IModel
    {
        public int Id { get; set; }
        public int IdPurchaseOrder { get; set; }
        public DateTime? OrderDate { get; set; }
        public int? QtyOrdered { get; set; }
        public bool? BackOrder { get; set; }
        public double? M2BuyPrice { get; set; }
        public string? Memo { get; set; }
        public bool? Status { get; set; }

        public int IdPart { get; set; }
        public string? PartNumber { get; set; }
        public string? PartDescripttion { get; set; }
        public string? Manufacturer { get; set; }
    }
}
