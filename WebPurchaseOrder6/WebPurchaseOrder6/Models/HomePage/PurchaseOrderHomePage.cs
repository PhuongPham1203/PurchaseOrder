using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebPurchaseOrder6.Models.HomePage
{
    public class PurchaseOrderHomePage
    {
        public PurchaseOrderHomePage()
        {
        }


        public int order_no { get; set; }

        public int id_supplier { get; set; }

        [StringLength(255)]
        public string supplier_name { get; set; }

        [StringLength(50)]
        public string stock_site { get; set; }

        [StringLength(50)]
        public string stock_name { get; set; }

        public DateTime? order_date { get; set; }

        public DateTime? last_update { get; set; }

        public bool? sent_email { get; set; }
    }
}