using WebAppMVCPurchaseOrder.Models.Context;

namespace WebAppMVCPurchaseOrder.Models.PurchaseOrderDetailRepository
{
    public interface IPurchaseOrderDetailRepository
    {
        public IModel GetPurchaseOrderDetail(int indexPO);
        public IEnumerable<Part> GetListPart();
        public string PostEditPurchaseOrderDetail(PODetailInPurchaseOrderDetailPage poDetail);
        

    }
}
