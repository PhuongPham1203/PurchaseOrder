using WebAppMVCPurchaseOrder.Models.Context;


namespace WebAppMVCPurchaseOrder.Models
{
    public partial class PurchaseOrderLine:IModel
    {
        public int Id { get; set; }
        public int IdPurchaseOrder { get; set; }
        public int IdPart { get; set; }
        public DateTime? OrderDate { get; set; }
        public int? QtyOrdered { get; set; }
        public int? QtyDelivered { get; set; }
        public bool? BackOrder { get; set; }
        public double? M2BuyPrice { get; set; }
        public string? Memo { get; set; }
        public bool? Status { get; set; }

        public virtual Part IdPartNavigation { get; set; } = null!;
        public virtual PurchaseOrder IdPurchaseOrderNavigation { get; set; } = null!;
    }
}
