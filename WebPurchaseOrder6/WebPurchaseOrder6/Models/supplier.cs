namespace WebPurchaseOrder6.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("supplier")]
    public partial class supplier
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public supplier()
        {
            purchase_order = new HashSet<purchase_order>();
        }

        public int id { get; set; }

        [StringLength(255)]
        public string supplier_shortname { get; set; }

        [StringLength(255)]
        public string supplier_name { get; set; }

        [StringLength(50)]
        public string stock_site { get; set; }

        [StringLength(50)]
        public string stock_name { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<purchase_order> purchase_order { get; set; }
    }
}
