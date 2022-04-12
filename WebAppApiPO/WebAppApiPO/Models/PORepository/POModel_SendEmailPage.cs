using WebAppApiPO.Interfaces.Models;

namespace WebAppApiPO.Models.PORepository
{
    public class POModel_SendEmailPage:IModelData
    {
        public POModel_SendEmailPage()
        {
        }

        public int OrderNo { get; set; }
        public bool? SendEmail { get; set; }
        public bool? CancelPo { get; set; }
        public string? PostCode { get; set; }

        public int IdSupplier { get; set; }
        public string? SupplierName { get; set; }
        public string? SupplierShortname { get; set; }
        public string? StockSite { get; set; }
        public string? StockName { get; set; }

        public string? OrderSendFromEmail { get; set; }
        public string? OrderSendToEmail { get; set; }
        public string? OrderSendToEmailCc { get; set; }
        public string? EmailSubject { get; set; }
        public string? EmailContent { get; set; }
        public List<POLModel_SendEmailPage> listPOLInSendEmailPages { get; set; }
    }
}
