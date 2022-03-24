using System;
using WebAppMVCPurchaseOrder.Models.PurchaseOrderRepository;

namespace WebAppMVCPurchaseOrder.Services.RepositoryServices
{

    public interface IRepositoryServices : IDisposable
    {
        public IPurchaseOrderRepository PurchaseOrder { get; }

        public int Complete();
    }
}
