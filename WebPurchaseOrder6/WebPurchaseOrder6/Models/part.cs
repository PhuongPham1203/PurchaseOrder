namespace WebPurchaseOrder6.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("part")]
    public partial class part
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public part()
        {
            purchase_order_line = new HashSet<purchase_order_line>();
        }

        public int id { get; set; }

        [StringLength(50)]
        public string part_number { get; set; }

        [StringLength(50)]
        public string part_descripttion { get; set; }

        [StringLength(50)]
        public string manufacturer { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<purchase_order_line> purchase_order_line { get; set; }
    }
}
