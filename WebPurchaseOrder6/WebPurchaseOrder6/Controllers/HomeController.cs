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
            // get 10 purchase order by defaul
            var unitOfWork = new UnitOfWork(new ModelCodeFirstSQLserver());

            var data = unitOfWork.PurchaseOrder.GetPOWithSupplier(0,10);

            return View(data);
        }

        
    }
}