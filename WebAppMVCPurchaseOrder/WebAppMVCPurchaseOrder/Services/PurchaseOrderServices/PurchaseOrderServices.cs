using WebAppMVCPurchaseOrder.Models.Context;
using WebAppMVCPurchaseOrder.Services.RepositoryServices;

namespace WebAppMVCPurchaseOrder.Services.PurchaseOrderServices
{
    public class PurchaseOrderServices
    {
        private IRepositoryServices pors;
        public PurchaseOrderServices(IRepositoryServices porServices)
        {
            pors = porServices;
        }
        public IEnumerable<IModel> GetListPurchaseOrder(int pageIndex, int pageSize)
        {
            
            var data = pors.PurchaseOrder.GetListPO(pageIndex, pageSize);

            return data;
        }

        public int GetLengthListPO()
        {
            int length = 0;

            length = pors.PurchaseOrder.GetLengthListPO();

            return length;
        }
        
    }
}
