using Newtonsoft.Json;
using WebAppMVCPurchaseOrder.Models;
using WebAppMVCPurchaseOrder.Models.Context;
using WebAppMVCPurchaseOrder.Models.PurchaseOrderDetailRepository;
using WebAppMVCPurchaseOrder.Services.RepositoryServices;

namespace WebAppMVCPurchaseOrder.Services.PurchaseOrderDetailServices
{
    public class PurchaseOrderDetailServices
    {
        public PurchaseOrderDetailServices() { }

        public IModel GetPurchaseOrderDetail(int indexPO)
        {
            PurchaseOrderRepositoryServices pors = new PurchaseOrderRepositoryServices(new purchaseorderContext());
            
            PODetailInPurchaseOrderDetailPage poDetail = (PODetailInPurchaseOrderDetailPage)pors.PurchaseOrderDetail.GetPurchaseOrderDetail(indexPO);

            poDetail.ListAvailablePart = (List<Part>)pors.PurchaseOrderDetail.GetListPart();

            return poDetail;
        }

        public IModel GetPurchaseOrderDetail(string id)
        {
            int index = 0;
            if (id != null && int.Parse(id) > 0)
            {
                index = int.Parse(id);
            }
            else
            {
                return null;
            }

            return this.GetPurchaseOrderDetail(index);

        }

        public string UpdatePurchaseOrderDetail(PODetailInPurchaseOrderDetailPage pod)
        {
            string status = "Update success!!!";




            return status;
        }

        public string UpdatePurchaseOrderDetail(string stringPODetailInPurchaseOrderDetailPage)
        {
            PODetailInPurchaseOrderDetailPage poDetail = JsonConvert.DeserializeObject<PODetailInPurchaseOrderDetailPage>(stringPODetailInPurchaseOrderDetailPage);
            return this.UpdatePurchaseOrderDetail(poDetail);
        }
    }


}
