namespace WebPurchaseOrder6.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class purchase_order
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public purchase_order()
        {
            purchase_order_line = new HashSet<purchase_order_line>();
        }

        [Key]
        public int order_no { get; set; }

        public int id_supplier { get; set; }

        public DateTime? order_date { get; set; }

        public DateTime? last_update { get; set; }

        public bool? sent_email { get; set; }

        public bool? cancel_po { get; set; }

        [StringLength(500)]
        public string note { get; set; }

        [StringLength(500)]
        public string address { get; set; }

        [StringLength(255)]
        public string country { get; set; }

        [StringLength(50)]
        public string post_code { get; set; }

        [StringLength(500)]
        public string order_sent_to_email { get; set; }

        [StringLength(500)]
        public string order_sent_to_email_cc { get; set; }

        [StringLength(255)]
        public string email_subject { get; set; }

        [Column(TypeName = "ntext")]
        public string email_content { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<purchase_order_line> purchase_order_line { get; set; }

        public virtual supplier supplier { get; set; }
    }
}
