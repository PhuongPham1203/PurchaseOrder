using WebAppApiPO.Interfaces.Models;
using WebAppApiPO.Interfaces.Services;
using WebAppApiPO.Models.Context;
using WebAppApiPO.Models.PODetailRepository;
using WebAppApiPO.Models.PORepository;

namespace WebAppApiPO.Services.RepositoryServices
{
    public class PORepositoryServices:IRepositoryServices
    {
        private readonly purchaseorderContext _context;

        public PORepositoryServices(purchaseorderContext context)
        {
            this._context = context;
            PurchaseOrder = new PORepository(this._context);
            PurchaseOrderDetail = new PODetailRepository(this._context);
        }
        public IPORepository PurchaseOrder { get; private set; }
        public IPODetailRepository PurchaseOrderDetail { get; private set; }

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
