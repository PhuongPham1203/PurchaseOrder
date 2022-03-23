using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using WebPurchaseOrder6.Models.HomePage;

namespace WebPurchaseOrder6.Models
{
    public class PurchaseOrderRepository : Repository<purchase_order>, IPurchaseOrderRepository
    {
        public PurchaseOrderRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<purchase_order> GetPOWithSupplier(int pageIndex = 0, int pageSize = 10)
        {
            return ModelSQLserver.purchase_order
                .OrderBy(po => po.order_no)
                .Skip(pageIndex)
                .Take(pageSize)
                .Include(s => s.supplier)
                .ToList();
        }

        public IEnumerable<PurchaseOrderHomePage> GetListPO(int pageIndex = 0, int pageSize = 10)
        {
            return ModelSQLserver.purchase_order
                .OrderBy(po => po.order_no)
                .Skip(pageIndex)
                .Take(pageSize)
                .Include(s => s.supplier)
                .Select(po_with_s => new PurchaseOrderHomePage()
                {
                    order_no = po_with_s.order_no,
                    id_supplier = po_with_s.id_supplier,
                    supplier_name = po_with_s.supplier.supplier_name,
                    stock_site = po_with_s.supplier.stock_site,
                    stock_name = po_with_s.supplier.stock_name,
                    order_date = po_with_s.order_date,
                    last_update = po_with_s.last_update,
                    sent_email = po_with_s.sent_email
                })
                .ToList();
        }

        public IEnumerable<purchase_order> GetTopPurchaseOrders(int count)
        {
            return ModelSQLserver.purchase_order.OrderBy(c => c.order_no).Take(count).ToList();
        }

        public ModelCodeFirstSQLserver ModelSQLserver
        {
            get { return Context as ModelCodeFirstSQLserver; }

        }
    }
}