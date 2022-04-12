using WebAppApiPO.Interfaces.Models;
using WebAppApiPO.Models.Context;
using WebAppApiPO.Services.RepositoryServices;

namespace WebAppApiPO.Services.POServices
{
    public class POServices
    {
        private PORepositoryServices porServices;
        public POServices(PORepositoryServices porServices)
        {
            this.porServices = porServices;
        }
        public IEnumerable<IModelData> GetListPurchaseOrder(int pageIndex, int pageSize)
        {
            
            var data = porServices.PurchaseOrder.GetListPO(pageIndex, pageSize);
            return data;
        }
    }
}
