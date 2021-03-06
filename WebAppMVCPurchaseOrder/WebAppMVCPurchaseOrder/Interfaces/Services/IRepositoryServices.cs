using WebAppMVCPurchaseOrder.Models.PurchaseOrderDetailRepository;
using WebAppMVCPurchaseOrder.Models.PurchaseOrderRepository;

namespace WebAppMVCPurchaseOrder.Services.RepositoryServices
{

    public interface IRepositoryServices : IDisposable
    {
        public IPurchaseOrderRepository PurchaseOrder { get; }
        public IPurchaseOrderDetailRepository PurchaseOrderDetail { get; }

        public int Complete();
    }
}
