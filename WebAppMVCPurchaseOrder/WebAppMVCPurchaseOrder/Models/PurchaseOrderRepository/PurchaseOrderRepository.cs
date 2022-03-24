using Microsoft.EntityFrameworkCore;
using WebAppMVCPurchaseOrder.Models.PurchaseOrderRepository;
using WebAppMVCPurchaseOrder.Models.Repository;

namespace WebAppMVCPurchaseOrder.Models.PurchaseOrderModel
{
    public class PurchaseOrderRepository: Repository<PurchaseOrder>, IPurchaseOrderRepository
    {
        public PurchaseOrderRepository(DbContext context) : base(context)
        {
        }

        public IEnumerable<POInHomePage> GetListPO(int pageIndex = 0, int pageSize = 10)
        {
            return ModelSQLserver.PurchaseOrders
                .OrderBy(po => po.OrderNo)
                .Skip(pageIndex)
                .Take(pageSize)
                .Include(s => s.IdSupplierNavigation)
                .Select(po_with_s => new POInHomePage()
                {
                    OrderNo = po_with_s.OrderNo,
                    IdSupplier = po_with_s.IdSupplierNavigation.Id,
                    SupplierName = po_with_s.IdSupplierNavigation.SupplierName,
                    StockSite = po_with_s.IdSupplierNavigation.StockSite,
                    StockName = po_with_s.IdSupplierNavigation.StockName,
                    OrderDate = po_with_s.OrderDate,
                    LastUpdate = po_with_s.LastUpdate,
                    SentEmail = po_with_s.SentEmail
                })
                .ToList();
        }


        public purchaseorderContext ModelSQLserver
        {
            get { return Context as purchaseorderContext; }

        }
    }
}
