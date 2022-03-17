namespace WebPurchaseOrder6.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class purchase_order_line
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id_purchase_order { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id_part { get; set; }

        public DateTime? order_date { get; set; }

        public int? qty_ordered { get; set; }

        public int? qty_delivered { get; set; }

        public bool? back_order { get; set; }

        public double? m2_buy_price { get; set; }

        [StringLength(255)]
        public string memo { get; set; }

        [Key]
        [Column(Order = 2)]
        public bool status { get; set; }

        public virtual part part { get; set; }

        public virtual purchase_order purchase_order { get; set; }
    }
}
