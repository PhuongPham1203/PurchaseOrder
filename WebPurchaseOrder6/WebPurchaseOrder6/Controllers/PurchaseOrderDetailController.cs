using System.Linq;
using System.Web.Mvc;
using WebPurchaseOrder6.Models;
using System.Data.Entity;
using Newtonsoft.Json;
using System.Collections.Generic;

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
            var pol = query.purchase_order_line
                .Select(p=> new {
                    p.id_purchase_order,
                    p.id_part,
                    p.qty_ordered,
                    p.order_date,
                    p.m2_buy_price,
                    p.memo
                }).ToList();

            query.supplier = null;
            query.purchase_order_line = null;

            var part = pol.Join(
                db.parts,
                pol1 => pol1.id_part,
                pa => pa.id,
                (pol1,pa) => new
                {
                    pa.id,
                    pa.part_number,
                    pa.part_descripttion,
                    pa.manufacturer 
                }
                ).ToList();

            var all_parts = db.parts.Select(p=>new {
                p.id,
                p.part_number,
                p.part_descripttion,
                p.manufacturer
            }).ToList();

            var data = Json(new {
                purchase_order = query,
                supplier = sup,
                purchase_order_line = pol,
                part = part,
                all_parts = all_parts
            });
            
            return data;

        }
    }
}