using Microsoft.AspNetCore.Mvc;
using WebAppMVCPurchaseOrder.Models;
using WebAppMVCPurchaseOrder.Services.RepositoryServices;
using Newtonsoft.Json.Serialization;
using System.Text.Json;
using WebAppMVCPurchaseOrder.Models.Context;

namespace WebAppMVCPurchaseOrder.Services.PurchaseOrderServices
{
    public class PurchaseOrderServices
    {
        public PurchaseOrderServices()
        {

        }
        public IEnumerable<IModel> GetListPurchaseOrder(int pageIndex, int pageSize)
        {
            PORepositoryServices pors  = new PORepositoryServices(new purchaseorderContext());
            var data = pors.PurchaseOrder.GetListPO(pageIndex, pageSize);
            return data;
        }
        
    }
}
