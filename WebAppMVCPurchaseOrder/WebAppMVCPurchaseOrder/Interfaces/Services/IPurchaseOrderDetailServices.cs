using WebAppMVCPurchaseOrder.Models.Context;
using WebAppMVCPurchaseOrder.Models.PurchaseOrderDetailRepository;

namespace WebAppMVCPurchaseOrder.Interfaces.Services
{
    public interface IPurchaseOrderDetailServices
    {
        public IModel GetPurchaseOrderDetail(int indexPO);
        public IModel GetPurchaseOrderDetail(string id);
        public string CancelPurchaseOrderDetail(int id);
        public string CancelPurchaseOrderDetail(string id);
        public string UpdatePurchaseOrderDetail(PODetailInPurchaseOrderDetailPage pod);
        public string UpdatePurchaseOrderDetail(string stringPODetailInPurchaseOrderDetailPage);


    }
}
