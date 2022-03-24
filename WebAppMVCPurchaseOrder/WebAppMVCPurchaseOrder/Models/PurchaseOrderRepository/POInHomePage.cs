using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using WebAppMVCPurchaseOrder.Models.Context;

namespace WebAppMVCPurchaseOrder.Models.PurchaseOrderRepository
{
    public class POInHomePage:IModel
    {
        public POInHomePage()
        {
        }

        public int OrderNo { get; set; }
        public DateTime? OrderDate { get; set; }
        public DateTime? LastUpdate { get; set; }
        public bool? SentEmail { get; set; }

        public int IdSupplier { get; set; }
        public string? SupplierName { get; set; }
        public string? StockSite { get; set; }
        public string? StockName { get; set; }

    }
}