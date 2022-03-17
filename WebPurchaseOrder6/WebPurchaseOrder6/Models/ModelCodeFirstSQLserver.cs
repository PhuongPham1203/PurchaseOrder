namespace WebPurchaseOrder6.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ModelCodeFirstSQLserver : DbContext
    {
        public ModelCodeFirstSQLserver()
            : base("name=ModelCodeFirstSQLserver")
        {
            this.Configuration.ProxyCreationEnabled = false;
        }

        public virtual DbSet<part> parts { get; set; }
        public virtual DbSet<purchase_order> purchase_order { get; set; }
        public virtual DbSet<supplier> suppliers { get; set; }
        public virtual DbSet<purchase_order_line> purchase_order_line { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<part>()
                .HasMany(e => e.purchase_order_line)
                .WithRequired(e => e.part)
                .HasForeignKey(e => e.id_part)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<purchase_order>()
                .HasMany(e => e.purchase_order_line)
                .WithRequired(e => e.purchase_order)
                .HasForeignKey(e => e.id_purchase_order)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<supplier>()
                .HasMany(e => e.purchase_order)
                .WithRequired(e => e.supplier)
                .HasForeignKey(e => e.id_supplier)
                .WillCascadeOnDelete(false);
        }
    }
}
