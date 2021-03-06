using WebAppMVCPurchaseOrder.Models.Context;

namespace WebAppMVCPurchaseOrder.Models
{
    public partial class PurchaseOrder:IModel
    {
        public int OrderNo { get; set; }
        public int IdSupplier { get; set; }
        public DateTime? OrderDate { get; set; }
        public DateTime? LastUpdate { get; set; }
        public bool? SendEmail { get; set; }
        public bool? CancelPo { get; set; }
        public string? Note { get; set; }
        public string? Address { get; set; }
        public string? Country { get; set; }
        public string? PostCode { get; set; }
        public string? OrderSendFromEmail { get; set; }
        public string? OrderSendToEmail { get; set; }
        public string? OrderSendToEmailCc { get; set; }
        public string? EmailSubject { get; set; }
        public string? EmailContent { get; set; }

        public virtual Supplier IdSupplierNavigation { get; set; } = null!;
    }
}
