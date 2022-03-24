using Microsoft.EntityFrameworkCore;
using System.Linq;
using WebAppMVCPurchaseOrder.Models.Context;
using WebAppMVCPurchaseOrder.Models.Repository;

namespace WebAppMVCPurchaseOrder.Models.PurchaseOrderDetailRepository
{
    public class PurchaseOrderDetailRepository : Repository<PurchaseOrderDetailRepository>, IPurchaseOrderDetailRepository
    {
        public PurchaseOrderDetailRepository(DbContext contex) : base(contex)
        {
        }
        public purchaseorderContext ModelSQLserver
        {
            get { return Context as purchaseorderContext; }

        }

        public IModel GetPurchaseOrderDetail(int indexPO)
        {
            var poDetail = ModelSQLserver.PurchaseOrders
                .Where(po => po.OrderNo == indexPO)
                .Include(supp => supp.IdSupplierNavigation)
                .Select(po_with_supp => new PODetailInPurchaseOrderDetailPage()
                {
                    OrderNo = po_with_supp.OrderNo,
                    OrderDate = po_with_supp.OrderDate,
                    CancelPo = po_with_supp.CancelPo,
                    Note = po_with_supp.Note,
                    Address = po_with_supp.Address,
                    Country = po_with_supp.Country,
                    PostCode = po_with_supp.PostCode,

                    IdSupplier = po_with_supp.IdSupplierNavigation.Id,
                    SupplierShortname = po_with_supp.IdSupplierNavigation.SupplierShortname,
                    SupplierName = po_with_supp.IdSupplierNavigation.SupplierName,
                    StockName = po_with_supp.IdSupplierNavigation.StockName,
                    StockSite = po_with_supp.IdSupplierNavigation.StockName
                }).First();

            var listPOLine = ModelSQLserver.PurchaseOrderLines
                .Where(pol => pol.IdPurchaseOrderNavigation.OrderNo == indexPO)
                .Include(part => part.IdPartNavigation)
                .Select(pol => new POLInPurchaseOrderDetailPage()
                {
                    IdPurchaseOrder = pol.IdPurchaseOrder,
                    OrderDate = pol.OrderDate,
                    BackOrder = pol.BackOrder,
                    M2BuyPrice = pol.M2BuyPrice,
                    Memo = pol.Memo,
                    Status = pol.Status,

                    IdPart = pol.IdPartNavigation.Id,
                    PartNumber = pol.IdPartNavigation.PartNumber,
                    PartDescripttion = pol.IdPartNavigation.PartDescripttion,
                    Manufacturer = pol.IdPartNavigation.Manufacturer
                }).ToList();

            

            poDetail.PurchaseOrderLines = listPOLine;
            
            return poDetail;
        }

        public IEnumerable<IModel> GetListPart()
        {

            return ModelSQLserver.Parts
                .ToList();

        }

        
    }
}
