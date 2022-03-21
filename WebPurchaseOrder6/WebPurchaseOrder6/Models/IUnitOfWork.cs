using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebPurchaseOrder6.Models
{
    public interface IUnitOfWork:IDisposable
    {
        IPurchaseOrderRepository PurchaseOrder { get; }

        int Complete();
    }
}
