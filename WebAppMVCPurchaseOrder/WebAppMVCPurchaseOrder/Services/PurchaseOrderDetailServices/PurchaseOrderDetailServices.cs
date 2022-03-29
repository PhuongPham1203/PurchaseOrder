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
        public string CancelPurchaseOrderDetail(int id)
        {
            PurchaseOrderRepositoryServices pors = new PurchaseOrderRepositoryServices(new purchaseorderContext());
            string status = pors.PurchaseOrder.CancelPO(id);

            pors.Complete();

            return status;
        }
        public string CancelPurchaseOrderDetail(string id)
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

            return this.CancelPurchaseOrderDetail(index);

        }

        public string UpdatePurchaseOrderDetail(PODetailInPurchaseOrderDetailPage pod)
        {
            string status = "";

            // Validate data in PODetail
            DateTime datePOHead = (DateTime)pod.OrderDate;

            for (int i = 0; i < pod.PurchaseOrderLines.Count; i++)
            {
                DateTime datePOL = (DateTime)pod.PurchaseOrderLines[i].OrderDate;


                if (pod.PurchaseOrderLines[i].QtyOrdered > 0 == false ||
                    pod.PurchaseOrderLines[i].M2BuyPrice > 0 == false ||
                    DateTime.Compare(datePOHead, datePOL) > 0
                    )
                {
                    return status = "Error Input";
                }

                
            }

            // Update in SQL Server
            PurchaseOrderRepositoryServices pors = new PurchaseOrderRepositoryServices(new purchaseorderContext());

            status = pors.PurchaseOrderDetail.PostEditPurchaseOrderDetail(pod);

            pors.Complete();


            return status;
        }

        public string UpdatePurchaseOrderDetail(string stringPODetailInPurchaseOrderDetailPage)
        {
            PODetailInPurchaseOrderDetailPage poDetail = JsonConvert.DeserializeObject<PODetailInPurchaseOrderDetailPage>(stringPODetailInPurchaseOrderDetailPage);
            
            return this.UpdatePurchaseOrderDetail(poDetail);
        }


    }


}
