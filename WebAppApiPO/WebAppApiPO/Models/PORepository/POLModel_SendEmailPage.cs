using WebAppApiPO.Interfaces.Models;

namespace WebAppApiPO.Models.PORepository
{
    public class POLModel_SendEmailPage : IModelData
    {
        public int? QtyOrdered { get; set; }
        public double? M2BuyPrice { get; set; }
        public string? PartNumber { get; set; }
    }
}
