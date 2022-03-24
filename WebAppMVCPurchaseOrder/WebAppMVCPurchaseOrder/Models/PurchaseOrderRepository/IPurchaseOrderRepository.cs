﻿using WebAppMVCPurchaseOrder.Models.Context;
using WebAppMVCPurchaseOrder.Models.PurchaseOrderRepository;
using WebAppMVCPurchaseOrder.Models.Repository;

namespace WebAppMVCPurchaseOrder.Models.PurchaseOrderRepository
{

    public interface IPurchaseOrderRepository: IRepository<PurchaseOrder>
    {
        public IEnumerable<IModel> GetListPO(int pageIndex, int pageSize);
    }
}