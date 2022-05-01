using Microsoft.EntityFrameworkCore;
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
            try
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
                        StockSite = po_with_supp.IdSupplierNavigation.StockSite
                    }).First();

                var listPOLine = ModelSQLserver.PurchaseOrderLines
                    .Where(pol =>
                        pol.IdPurchaseOrderNavigation.OrderNo == indexPO
                        && pol.Status == true
                        )
                    .Include(part => part.IdPartNavigation)
                    .Select(pol => new POLInPurchaseOrderDetailPage()
                    {
                        Id = pol.Id,
                        IdPurchaseOrder = pol.IdPurchaseOrder,
                        OrderDate = pol.OrderDate,
                        BackOrder = pol.BackOrder,
                        QtyOrdered = pol.QtyOrdered,
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
            catch (Exception ex) { 
                Console.WriteLine(ex.Message);
            }
            return null;
        }

        public IEnumerable<IModel> GetListPart()
        {

            return (IEnumerable<IModel>)ModelSQLserver.Parts.ToList();

        }

        public string PostEditPurchaseOrderDetail(PODetailInPurchaseOrderDetailPage poDetail)
        {
            string status = "Error query update";
            try
            {
                PurchaseOrder po = ModelSQLserver.PurchaseOrders
                .Where(po => po.OrderNo == poDetail.OrderNo)
                .First();

                po.Note = poDetail.Note;
                po.Address = poDetail.Address;
                po.Country = poDetail.Country;
                po.PostCode = poDetail.PostCode;
                po.LastUpdate = DateTime.Now;

                // remove old POL
                var allPOLs = ModelSQLserver.PurchaseOrderLines
                .Where(pol => pol.IdPurchaseOrder == poDetail.OrderNo);
                if (allPOLs.Any())
                {
                    ModelSQLserver.RemoveRange(allPOLs);
                }

                var listPOL = new List<PurchaseOrderLine>();
                for (int i = 0; i < poDetail.PurchaseOrderLines.Count; i++)
                {
                    var line = new PurchaseOrderLine
                    {
                        IdPurchaseOrder = poDetail.OrderNo,
                        IdPart = poDetail.PurchaseOrderLines[i].IdPart,
                        OrderDate = poDetail.PurchaseOrderLines[i].OrderDate,
                        QtyOrdered = poDetail.PurchaseOrderLines[i].QtyOrdered,
                        M2BuyPrice = poDetail.PurchaseOrderLines[i].M2BuyPrice,
                        Memo = poDetail.PurchaseOrderLines[i].Memo
                    };
                    listPOL.Add(line);
                }

                PurchaseOrderLine[] pols = listPOL.ToArray();

                ModelSQLserver.PurchaseOrderLines.AddRange(pols);

                status = "Update Success";
            }
            catch (Exception ex)
            {
               
                Console.WriteLine(ex.Message);

            }


            return status;
        }
    }
}
