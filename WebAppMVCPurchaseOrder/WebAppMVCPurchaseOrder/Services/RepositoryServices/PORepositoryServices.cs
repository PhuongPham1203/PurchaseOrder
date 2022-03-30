using WebAppMVCPurchaseOrder.Models;
using WebAppMVCPurchaseOrder.Models.PurchaseOrderDetailRepository;
using WebAppMVCPurchaseOrder.Models.PurchaseOrderRepository;

namespace WebAppMVCPurchaseOrder.Services.RepositoryServices
{
    public class PORepositoryServices : IRepositoryServices
    {
        private readonly purchaseorderContext _context;

        public PORepositoryServices(purchaseorderContext context)
        {
            this._context = context;
            PurchaseOrder = new PurchaseOrderRepository(this._context);
            PurchaseOrderDetail = new PurchaseOrderDetailRepository(this._context);
        }
        public IPurchaseOrderRepository PurchaseOrder { get; private set; }
        public IPurchaseOrderDetailRepository PurchaseOrderDetail { get; private set; }

        public int Complete()
        {
            return this._context.SaveChanges();
        }

        public void Dispose()
        {
            this._context.Dispose();
        }
    }
}
