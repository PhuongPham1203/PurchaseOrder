using System;
using System.Collections.Generic;

namespace WebAppMVCPurchaseOrder.Models.Context
{
    public partial class Part
    {
        public Part()
        {
            PurchaseOrderLines = new HashSet<PurchaseOrderLine>();
        }

        public int Id { get; set; }
        public string? PartNumber { get; set; }
        public string? PartDescripttion { get; set; }
        public string? Manufacturer { get; set; }

        public virtual ICollection<PurchaseOrderLine> PurchaseOrderLines { get; set; }
    }
}
