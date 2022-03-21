using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
namespace WebPurchaseOrder6.Models
{
    public class PurchaseOrderRepository : Repository<purchase_order>, IPurchaseOrderRepository
    {
        public PurchaseOrderRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<purchase_order> GetPOWithSupplier(int pageIndex=0, int pageSize=10)
        {
            return ModelSQLserver.purchase_order
                .OrderBy(p => p.order_no)
                .Skip(pageIndex)
                .Take(pageSize)
                .Include(s => s.supplier)
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