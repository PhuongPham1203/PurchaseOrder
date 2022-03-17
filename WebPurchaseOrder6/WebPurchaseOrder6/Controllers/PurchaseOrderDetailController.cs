using System.Linq;
using System.Web.Mvc;
using WebPurchaseOrder6.Models;
using System.Data.Entity;
using Newtonsoft.Json;

namespace WebPurchaseOrder6.Controllers
{
    public class PurchaseOrderDetailController : Controller
    {
        // GET: PurchaseOrderDetail
        public ActionResult Index(string id)
        {
            if (id is null)
            {
                return Redirect("/Home");
            }
            int index = int.Parse(id);
            ViewBag.indexPO = index;

            return View();
        }

        // POST: PurchaseOrderDetail/getdata
        [HttpPost]
        public ActionResult GetData(int id)
        {

            int index = id;//int.Parse(id);

            ModelCodeFirstSQLserver db = new ModelCodeFirstSQLserver();
            // get purchase order detail by id
            purchase_order query = db.purchase_order
                .Where(p => p.order_no == index)
                .Include(p => p.supplier)
                .Include(p => p.purchase_order_line)
                .FirstOrDefault();

            
            var sup = query.supplier;
            var pol = query.purchase_order_line;

            query.supplier = null;
            query.purchase_order_line = null;

            var data = Json(new { purchase_order = query, supplier = sup, purchase_order_line = pol });

            return data;

        }
    }
}