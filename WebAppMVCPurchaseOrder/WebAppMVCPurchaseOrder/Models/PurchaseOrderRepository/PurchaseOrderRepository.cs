using Microsoft.EntityFrameworkCore;
using WebAppMVCPurchaseOrder.Models.Context;
using WebAppMVCPurchaseOrder.Models.Repository;

namespace WebAppMVCPurchaseOrder.Models.PurchaseOrderRepository
{
    public class PurchaseOrderRepository: Repository<PurchaseOrder>, IPurchaseOrderRepository
    {
        public PurchaseOrderRepository(DbContext context) : base(context)
        {
        }
        public purchaseorderContext ModelSQLserver
        {
            get { return Context as purchaseorderContext; }

        }

        public string CancelPO(int orderNo)
        {
            string status = "Error Query";
            try
            {
                var purchaseOrder = ModelSQLserver.PurchaseOrders
                    .Where(o => o.OrderNo == orderNo)
                    .First();
                purchaseOrder.CancelPo = true;

                var listPOL = ModelSQLserver.PurchaseOrderLines
                    .Where(pol => pol.IdPurchaseOrder == orderNo)
                    .ToList();

                for(int i = 0; i < listPOL.Count; i++)
                {
                    listPOL[i].M2BuyPrice = 0;
                    listPOL[i].QtyOrdered = 0;
                }
                status = "Update Success";
            }catch (Exception ex)
            {

            }
            return status;
        }

        public IEnumerable<IModel> GetListPO(int pageIndex = 0, int pageSize = 10)
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

        
        
    }
}
