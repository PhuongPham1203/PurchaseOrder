using WebAppMVCPurchaseOrder.Models.PurchaseOrderRepository;
using WebAppMVCPurchaseOrder.Models.Repository;

namespace WebAppMVCPurchaseOrder.Models.PurchaseOrderModel
{

    public interface IPurchaseOrderRepository: IRepository<PurchaseOrder>
    {
        IEnumerable<POInHomePage> GetListPO(int pageIndex, int pageSize);
    }
}