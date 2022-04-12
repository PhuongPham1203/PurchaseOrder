using WebAppApiPO.Interfaces.Models;

namespace WebAppApiPO.Models.PORepository
{
    public class POModel_POPage:IModelData
    {
        public POModel_POPage()
        {
        }

        public int OrderNo { get; set; }
        public DateTime? OrderDate { get; set; }
        public DateTime? LastUpdate { get; set; }
        public bool? SendEmail { get; set; }

        public int IdSupplier { get; set; }
        public string? SupplierName { get; set; }
        public string? StockSite { get; set; }
        public string? StockName { get; set; }
    }
}
