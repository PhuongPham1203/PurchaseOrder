using WebAppMVCPurchaseOrder.Models.PurchaseOrderModel;
using System;
namespace WebAppMVCPurchaseOrder.Services.RepositoryServices
{

    public interface IRepositoryServices : IDisposable
    {
        public IPurchaseOrderRepository PurchaseOrder { get; }

        public int Complete();
    }
}
