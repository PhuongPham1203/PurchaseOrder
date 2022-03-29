using WebAppMVCPurchaseOrder.Models.Context;
using WebAppMVCPurchaseOrder.Models.PurchaseOrderRepository;
using WebAppMVCPurchaseOrder.Models.Repository;

namespace WebAppMVCPurchaseOrder.Models.PurchaseOrderRepository
{

    public interface IPurchaseOrderRepository: IRepository<PurchaseOrder>
    {
        public IEnumerable<IModel> GetListPO(int pageIndex, int pageSize);
        public string CancelPO(int orderNo);
        public IModel GetPOWithEmail(int indexPO);
        public string SendEmailDetail(POInSendEmailPage emailDetail);
    }
}