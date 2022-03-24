using WebAppMVCPurchaseOrder.Models;
using WebAppMVCPurchaseOrder.Models.PurchaseOrderModel;

namespace WebAppMVCPurchaseOrder.Services.RepositoryServices
{
    public class PurchaseOrderRepositoryServices : IRepositoryServices
    {
        private readonly purchaseorderContext _context;

        public PurchaseOrderRepositoryServices(purchaseorderContext context)
        {
            this._context = context;
            PurchaseOrder = new PurchaseOrderRepository(this._context);
        }
        public IPurchaseOrderRepository PurchaseOrder { get; private set; }

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
