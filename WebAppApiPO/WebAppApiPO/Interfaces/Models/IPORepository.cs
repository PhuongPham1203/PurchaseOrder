using WebAppApiPO.Models.Context;
using WebAppApiPO.Models.PORepository;

namespace WebAppApiPO.Interfaces.Models
{
    public interface IPORepository:IRepository<PurchaseOrder>
    {
        public IEnumerable<IModelData> GetListPO(int pageIndex, int pageSize);
        public string CancelPO(int orderNo);
        public IModelData GetPOWithEmail(int indexPO);
        public string SendEmailDetail(POModel_SendEmailPage emailDetail);
    }
}
