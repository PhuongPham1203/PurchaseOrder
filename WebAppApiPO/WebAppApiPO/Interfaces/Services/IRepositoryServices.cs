using WebAppApiPO.Interfaces.Models;

namespace WebAppApiPO.Interfaces.Services
{
    public interface IRepositoryServices: IDisposable
    {
        public IPORepository PurchaseOrder { get; }
        public IPODetailRepository PurchaseOrderDetail { get; }

        public int Complete();
    }
}
