using WebAppApiPO.Interfaces.Models;

namespace WebAppApiPO.Models.Context
{
    public partial class Part:IModelData
    {
        public Part()
        {
            PurchaseOrderLines = new HashSet<PurchaseOrderLine>();
        }

        public int Id { get; set; }
        public string? PartNumber { get; set; }
        public string? PartDescripttion { get; set; }
        public string? Manufacturer { get; set; }

        public virtual ICollection<PurchaseOrderLine> PurchaseOrderLines { get; set; }
    }
}
