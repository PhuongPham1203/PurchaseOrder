using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebPurchaseOrder6.Models;
using System.Data.Entity;

namespace WebPurchaseOrder6.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ModelCodeFirstSQLserver db = new ModelCodeFirstSQLserver();
            // get 10 purchase order
            var query = db.purchase_order.OrderBy(p => p.order_no).Skip(0).Take(10)
                .Include(p => p.supplier);

            return View(query.ToList());
        }

        
    }
}