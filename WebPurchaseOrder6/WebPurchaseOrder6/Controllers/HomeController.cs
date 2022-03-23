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
            var unitOfWork = new UnitPurchaseOrderOfWork(new ModelCodeFirstSQLserver());

            var data = unitOfWork.PurchaseOrder.GetPOWithSupplier(0, 10);

            return View(data);
        }

        // /Home/GetPurchaseOrder/0
        [HttpGet]
        public ActionResult GetPurchaseOrder(string id)
        {
            // defaul: id = 0
            int indexPage = 0;
            if (!(id is null))
            {
                indexPage = int.Parse(id);
            }
            var unitPurchaseOrderOfWork = new UnitPurchaseOrderOfWork(new ModelCodeFirstSQLserver());
            var data = unitPurchaseOrderOfWork.PurchaseOrder.GetListPO(indexPage, 10);

            return Json(data, JsonRequestBehavior.AllowGet);
        }

       


    }
}