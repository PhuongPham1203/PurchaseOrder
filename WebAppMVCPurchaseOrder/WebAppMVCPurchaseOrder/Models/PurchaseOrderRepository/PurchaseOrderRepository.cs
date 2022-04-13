using Microsoft.EntityFrameworkCore;
using WebAppMVCPurchaseOrder.Models.Context;
using WebAppMVCPurchaseOrder.Models.Repository;

namespace WebAppMVCPurchaseOrder.Models.PurchaseOrderRepository
{
    public class PurchaseOrderRepository : Repository<PurchaseOrder>, IPurchaseOrderRepository
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
                purchaseOrder.LastUpdate = DateTime.Now;

                var listPOL = ModelSQLserver.PurchaseOrderLines
                    .Where(pol => pol.IdPurchaseOrder == orderNo)
                    .ToList();

                for (int i = 0; i < listPOL.Count; i++)
                {
                    listPOL[i].M2BuyPrice = 0;
                    listPOL[i].QtyOrdered = 0;
                }
                status = "Update Success";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);

            }
            return status;
        }

        public IEnumerable<IModel> GetListPO(int pageIndex = 0, int pageSize = 10)
        {
            try
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
                        SendEmail = po_with_s.SendEmail
                    })
                    .ToList();
            }
            catch (Exception ex) { }
            return null;
        }

        public IModel GetPOWithEmail(int index)
        {

            try
            {
                var data = ModelSQLserver.PurchaseOrders
                .Where(po => po.OrderNo == index)
                .Select(po => new POInSendEmailPage()
                {
                    OrderNo = po.OrderNo,
                    SendEmail = po.SendEmail,
                    CancelPo = po.CancelPo,
                    PostCode = po.PostCode,

                    IdSupplier = po.IdSupplierNavigation.Id,
                    SupplierName = po.IdSupplierNavigation.SupplierName,
                    SupplierShortname = po.IdSupplierNavigation.SupplierShortname,
                    StockSite = po.IdSupplierNavigation.StockSite,
                    StockName = po.IdSupplierNavigation.StockName,

                    OrderSendFromEmail = po.OrderSendFromEmail,
                    OrderSendToEmail = po.OrderSendToEmail,
                    OrderSendToEmailCc = po.OrderSendToEmailCc,
                    EmailSubject = po.EmailSubject,
                    EmailContent = po.EmailContent,
                }).First();

                var listPOL = ModelSQLserver.PurchaseOrderLines
                    .Where(pol => pol.IdPurchaseOrder == index)
                    .Include(polPart => polPart.IdPartNavigation)
                    .Select(pol => new POLInSendEmailPage()
                    {
                        PartNumber = pol.IdPartNavigation.PartNumber,
                        QtyOrdered = pol.QtyOrdered,
                        M2BuyPrice = pol.M2BuyPrice,
                    })
                    .ToList();
                data.listPOLInSendEmailPages = listPOL;

                return data;
            }
            catch (Exception ex) { 
                Console.WriteLine(ex.Message);
            }


            return null;
        }

        public string SendEmailDetail(POInSendEmailPage emailDetail)
        {
            string status = "Update Success";
            try
            {
                PurchaseOrder data = ModelSQLserver.PurchaseOrders
                    .Where(po => po.OrderNo == emailDetail.OrderNo)
                    .First();

                data.LastUpdate = DateTime.Now;

                data.OrderSendFromEmail = emailDetail.OrderSendFromEmail;
                data.OrderSendToEmail = emailDetail.OrderSendToEmail;
                data.OrderSendToEmailCc = emailDetail.OrderSendToEmailCc;
                data.EmailSubject = emailDetail.EmailSubject;
                data.EmailContent = emailDetail.EmailContent;
                data.SendEmail = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                status = "Query Error";
            }

            return status;
        }
    }
}
