using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebPurchaseOrder6.Models
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ModelCodeFirstSQLserver _context;
        public UnitOfWork(ModelCodeFirstSQLserver context)
        {
            this._context = context;
            PurchaseOrder = new PurchaseOrderRepository(_context);
        }
        public IPurchaseOrderRepository PurchaseOrder { get; private set; }

        public int Complete()
        {
            return this._context.SaveChanges();
        }

        public void Dispose()
        {
            this._context.Dispose();
        }
    }
}