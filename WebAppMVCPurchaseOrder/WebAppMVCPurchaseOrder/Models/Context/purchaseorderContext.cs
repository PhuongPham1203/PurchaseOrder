using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebAppMVCPurchaseOrder.Models.Context
{
    public partial class purchaseorderContext : DbContext
    {
        public purchaseorderContext()
        {
        }

        public purchaseorderContext(DbContextOptions<purchaseorderContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Department> Departments { get; set; } = null!;
        public virtual DbSet<Part> Parts { get; set; } = null!;
        public virtual DbSet<PurchaseOrder> PurchaseOrders { get; set; } = null!;
        public virtual DbSet<PurchaseOrderLine> PurchaseOrderLines { get; set; } = null!;
        public virtual DbSet<Supplier> Suppliers { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>(entity =>
            {
                entity.ToTable("department");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");
            });

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

                entity.Property(e => e.OrderSendFromEmail)
                    .HasMaxLength(500)
                    .HasColumnName("order_send_from_email");

                entity.Property(e => e.OrderSendToEmail)
                    .HasMaxLength(500)
                    .HasColumnName("order_send_to_email");

                entity.Property(e => e.OrderSendToEmailCc)
                    .HasMaxLength(500)
                    .HasColumnName("order_send_to_email_cc");

                entity.Property(e => e.PostCode)
                    .HasMaxLength(50)
                    .HasColumnName("post_code");

                entity.Property(e => e.SendEmail)
                    .HasColumnName("send_email")
                    .HasDefaultValueSql("((0))");

                entity.HasOne(d => d.IdSupplierNavigation)
                    .WithMany(p => p.PurchaseOrders)
                    .HasForeignKey(d => d.IdSupplier)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_purchase_order_supplier");
            });

            modelBuilder.Entity<PurchaseOrderLine>(entity =>
            {
                entity.ToTable("purchase_order_line");

                entity.Property(e => e.Id).HasColumnName("id");

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
                    .WithMany(p => p.PurchaseOrderLines)
                    .HasForeignKey(d => d.IdPart)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_purchase_order_line_part");

                entity.HasOne(d => d.IdPurchaseOrderNavigation)
                    .WithMany(p => p.PurchaseOrderLines)
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

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IdDepartment).HasColumnName("id_department");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .HasColumnName("password");

                entity.Property(e => e.Token)
                    .HasMaxLength(50)
                    .HasColumnName("token");

                entity.Property(e => e.Username)
                    .HasMaxLength(25)
                    .HasColumnName("username");

                entity.HasOne(d => d.IdDepartmentNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.IdDepartment)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_user_user");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
