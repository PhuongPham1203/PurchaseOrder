using WebAppApiPO.Interfaces.Models;

namespace WebAppApiPO.Models.Context
{
    public partial class Supplier: IModelData
    {
        public Supplier()
        {
            PurchaseOrders = new HashSet<PurchaseOrder>();
        }

        public int Id { get; set; }
        public string? SupplierShortname { get; set; }
        public string? SupplierName { get; set; }
        public string? StockSite { get; set; }
        public string? StockName { get; set; }

        public virtual ICollection<PurchaseOrder> PurchaseOrders { get; set; }
    }
}
