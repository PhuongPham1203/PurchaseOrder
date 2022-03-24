using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebAppMVCPurchaseOrder.Models
{
    public partial class purchaseorderContext : DbContext
    {
        // command create model from database :
        // dotnet ef DBContext scaffold "Server=DESKTOP-RGUBRDT\PHAMPCSQLSERVER;Database=purchaseorder;User Id=adminpurchaseorder;Password=123456" Microsoft.EntityFrameworkCore.SqlServer -o Models
        // Scaffold-DbContext "Server=DESKTOP-RGUBRDT\PHAMPCSQLSERVER;Database=purchaseorder;Trusted_Connection=True;User Id=adminpurchaseorder;Password=123456" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models

        public purchaseorderContext()
        {
        }

        public purchaseorderContext(DbContextOptions<purchaseorderContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Part> Parts { get; set; } = null!;
        public virtual DbSet<PurchaseOrder> PurchaseOrders { get; set; } = null!;
        public virtual DbSet<PurchaseOrderLine> PurchaseOrderLines { get; set; } = null!;
        public virtual DbSet<Supplier> Suppliers { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-RGUBRDT\\PHAMPCSQLSERVER;Database=purchaseorder;Trusted_Connection=True;User Id=adminpurchaseorder;Password=123456");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Part>(entity =>
            {
                entity.ToTable("part");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Manufacturer)
                    .HasMaxLength(50)
                    .HasColumnName("manufacturer");

                entity.Property(e => e.PartDescripttion)
                    .HasMaxLength(50)
                    .HasColumnName("part_descripttion");

                entity.Property(e => e.PartNumber)
                    .HasMaxLength(50)
                    .HasColumnName("part_number");
            });

            modelBuilder.Entity<PurchaseOrder>(entity =>
            {
                entity.HasKey(e => e.OrderNo);

                entity.ToTable("purchase_order");

                entity.Property(e => e.OrderNo).HasColumnName("order_no");

                entity.Property(e => e.Address)
                    .HasMaxLength(500)
                    .HasColumnName("address");

                entity.Property(e => e.CancelPo)
                    .HasColumnName("cancel_po")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.Country)
                    .HasMaxLength(255)
                    .HasColumnName("country");

                entity.Property(e => e.EmailContent)
                    .HasColumnType("ntext")
                    .HasColumnName("email_content");

                entity.Property(e => e.EmailSubject)
                    .HasMaxLength(255)
                    .HasColumnName("email_subject");

                entity.Property(e => e.IdSupplier).HasColumnName("id_supplier");

                entity.Property(e => e.LastUpdate)
                    .HasColumnType("datetime")
                    .HasColumnName("last_update");

                entity.Property(e => e.Note)
                    .HasMaxLength(500)
                    .HasColumnName("note");

                entity.Property(e => e.OrderDate)
                    .HasColumnType("datetime")
                    .HasColumnName("order_date");

                entity.Property(e => e.OrderSentToEmail)
                    .HasMaxLength(500)
                    .HasColumnName("order_sent_to_email");

                entity.Property(e => e.OrderSentToEmailCc)
                    .HasMaxLength(500)
                    .HasColumnName("order_sent_to_email_cc");

                entity.Property(e => e.PostCode)
                    .HasMaxLength(50)
                    .HasColumnName("post_code");

                entity.Property(e => e.SentEmail)
                    .HasColumnName("sent_email")
                    .HasDefaultValueSql("((0))");

                entity.HasOne(d => d.IdSupplierNavigation)
                    .WithMany(p => p.PurchaseOrders)
                    .HasForeignKey(d => d.IdSupplier)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_purchase_order_supplier");
            });

            modelBuilder.Entity<PurchaseOrderLine>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("purchase_order_line");

                entity.Property(e => e.BackOrder)
                    .HasColumnName("back_order")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.IdPart).HasColumnName("id_part");

                entity.Property(e => e.IdPurchaseOrder).HasColumnName("id_purchase_order");

                entity.Property(e => e.M2BuyPrice).HasColumnName("m2_buy_price");

                entity.Property(e => e.Memo)
                    .HasMaxLength(255)
                    .HasColumnName("memo");

                entity.Property(e => e.OrderDate)
                    .HasColumnType("datetime")
                    .HasColumnName("order_date");

                entity.Property(e => e.QtyDelivered)
                    .HasColumnName("qty_delivered")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.QtyOrdered)
                    .HasColumnName("qty_ordered")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasColumnName("status")
                    .HasDefaultValueSql("((1))");

                entity.HasOne(d => d.IdPartNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdPart)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_purchase_order_line_part");

                entity.HasOne(d => d.IdPurchaseOrderNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdPurchaseOrder)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_purchase_order_line_purchase_order");
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.ToTable("supplier");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.StockName)
                    .HasMaxLength(50)
                    .HasColumnName("stock_name");

                entity.Property(e => e.StockSite)
                    .HasMaxLength(50)
                    .HasColumnName("stock_site");

                entity.Property(e => e.SupplierName)
                    .HasMaxLength(255)
                    .HasColumnName("supplier_name");

                entity.Property(e => e.SupplierShortname)
                    .HasMaxLength(255)
                    .HasColumnName("supplier_shortname");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
