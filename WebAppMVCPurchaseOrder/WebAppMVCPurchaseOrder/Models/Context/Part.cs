using System;
using System.Collections.Generic;

namespace WebAppMVCPurchaseOrder.Models
{
    public partial class Part
    {
        public int Id { get; set; }
        public string? PartNumber { get; set; }
        public string? PartDescripttion { get; set; }
        public string? Manufacturer { get; set; }
    }
}
