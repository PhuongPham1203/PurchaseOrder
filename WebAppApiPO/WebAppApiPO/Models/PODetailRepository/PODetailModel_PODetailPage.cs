using WebAppApiPO.Interfaces.Models;
using WebAppApiPO.Models.Context;

namespace WebAppApiPO.Models.PODetailRepository
{
    public class PODetailModel_PODetailPage : IModelData
    {
        public PODetailModel_PODetailPage() { }

        public int OrderNo { get; set; }
        public DateTime? OrderDate { get; set; }
        public bool? CancelPo { get; set; }
        public string? Note { get; set; }
        public string? Address { get; set; }
        public string? Country { get; set; }
        public string? PostCode { get; set; }


        public int IdSupplier { get; set; }
        public string? SupplierShortname { get; set; }
        public string? SupplierName { get; set; }
        public string? StockSite { get; set; }
        public string? StockName { get; set; }


        public List<POLModel_PODetailPage> PurchaseOrderLines { get; set; }

        public List<Part> ListAvailablePart { get; set; }

    }
}
