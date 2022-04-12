using WebAppApiPO.Models.PODetailRepository;

namespace WebAppApiPO.Interfaces.Models
{
    public interface IPODetailRepository
    {
        public IModelData GetPurchaseOrderDetail(int indexPO);
        public IEnumerable<IModelData> GetListPart();
        public string PostEditPurchaseOrderDetail(PODetailModel_PODetailPage poDetail);
    }
}
