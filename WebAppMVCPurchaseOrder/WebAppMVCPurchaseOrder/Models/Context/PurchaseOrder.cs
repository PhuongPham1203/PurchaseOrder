using System;
using System.Collections.Generic;

namespace WebAppMVCPurchaseOrder.Models
{
    public partial class PurchaseOrder
    {
        public int OrderNo { get; set; }
        public int IdSupplier { get; set; }
        public DateTime? OrderDate { get; set; }
        public DateTime? LastUpdate { get; set; }
        public bool? SentEmail { get; set; }
        public bool? CancelPo { get; set; }
        public string? Note { get; set; }
        public string? Address { get; set; }
        public string? Country { get; set; }
        public string? PostCode { get; set; }
        public string? OrderSentToEmail { get; set; }
        public string? OrderSentToEmailCc { get; set; }
        public string? EmailSubject { get; set; }
        public string? EmailContent { get; set; }

        public virtual Supplier IdSupplierNavigation { get; set; } = null!;
    }
}
