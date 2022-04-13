using WebAppMVCPurchaseOrder.Models.Context;

namespace WebAppMVCPurchaseOrder.Models.PurchaseOrderDetailRepository
{
    public interface IPurchaseOrderDetailRepository
    {
        public IModel GetPurchaseOrderDetail(int indexPO);
        public IEnumerable<IModel> GetListPart();
        public string PostEditPurchaseOrderDetail(PODetailInPurchaseOrderDetailPage poDetail);
        

    }
}
