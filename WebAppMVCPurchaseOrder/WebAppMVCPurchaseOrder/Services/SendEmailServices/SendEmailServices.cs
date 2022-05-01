using Newtonsoft.Json;
using WebAppMVCPurchaseOrder.Models;
using WebAppMVCPurchaseOrder.Models.Context;
using WebAppMVCPurchaseOrder.Models.PurchaseOrderRepository;
using WebAppMVCPurchaseOrder.Services.RepositoryServices;

namespace WebAppMVCPurchaseOrder.Services.SendEmailServices
{
    public class SendEmailServices
    {
        private IRepositoryServices pors;
        public SendEmailServices(IRepositoryServices porServices) {
            pors = porServices;
        }

        public IModel GetEmailDetail(int indexPO)
        {
            POInSendEmailPage poEmailDetail = (POInSendEmailPage)pors.PurchaseOrder.GetPOWithEmail(indexPO);

            return poEmailDetail;
        }

        public IModel GetEmailDetail(string id)
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
            return this.GetEmailDetail(index);
        }

        public string UpdateEmailDetail(POInSendEmailPage poEmailDetail)
        {
            string status = "Update Success";

            //validate Input
            if (poEmailDetail.OrderSendToEmail == "" || !poEmailDetail.OrderSendToEmail.Contains('@'))
            { status = "Email Send To Supplier Input Error"; }

            if (poEmailDetail.OrderSendToEmailCc.Contains(','))
            {
                var arr = poEmailDetail.OrderSendToEmailCc.Split(',');
                for (int i = 0; i < arr.Length; i++)
                {
                    if (!arr[i].Contains('@'))
                    { status = "Email CC Input Error"; }
                }
            }
            else if (poEmailDetail.OrderSendToEmailCc != "")
            {
                if (!poEmailDetail.OrderSendToEmailCc.Contains('@'))
                {
                    { status = "Email CC Input Error"; }
                }
            }

            if (poEmailDetail.EmailSubject == "")
            { status = "Email Subject Input Error"; }

            if (poEmailDetail.EmailContent == "")
            { status = "Email Content Input Error"; }

            if (status != "Update Success")
            {
                return status;
            }


            // Update Send Email

            status = pors.PurchaseOrder.SendEmailDetail(poEmailDetail);
            
            pors.Complete();

            return status;
        }

        public string UpdateEmailDetail(string poEmailDetail)
        {
            POInSendEmailPage poEmail = JsonConvert.DeserializeObject<POInSendEmailPage>(poEmailDetail);
            return this.UpdateEmailDetail(poEmail);
        }
    }
}
