using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebPurchaseOrder6.Models
{
    public interface IPurchaseOrderRepository:IRepository<purchase_order>
    {
        IEnumerable<purchase_order> GetTopPurchaseOrders(int count);
        IEnumerable<purchase_order> GetPOWithSupplier(int pageIndex,int pageSize);

    }
}
