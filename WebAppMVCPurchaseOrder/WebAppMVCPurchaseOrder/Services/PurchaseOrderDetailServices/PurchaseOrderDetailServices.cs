using WebAppMVCPurchaseOrder.Models;
using WebAppMVCPurchaseOrder.Models.Context;
using WebAppMVCPurchaseOrder.Models.PurchaseOrderDetailRepository;
using WebAppMVCPurchaseOrder.Services.RepositoryServices;

namespace WebAppMVCPurchaseOrder.Services.PurchaseOrderDetailServices
{
    public class PurchaseOrderDetailServices
    {
        public PurchaseOrderDetailServices() { }

        public IModel GePurchaseOrderDetail(int indexPO)
        {
            PurchaseOrderRepositoryServices pors = new PurchaseOrderRepositoryServices(new purchaseorderContext());
            
            PODetailInPurchaseOrderDetailPage poDetail = (PODetailInPurchaseOrderDetailPage)pors.PurchaseOrderDetail.GetPurchaseOrderDetail(indexPO);

            poDetail.ListAvailablePart = (List<Part>)pors.PurchaseOrderDetail.GetListPart();

            return poDetail;
        }
    }


}
