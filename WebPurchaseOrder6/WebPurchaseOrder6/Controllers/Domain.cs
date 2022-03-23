using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebPurchaseOrder6.Controllers
{
    
    public static class Domain
    {
        private static string urlAngular = "http://localhost:1234/";
        public static string getUrlAngular()
        {
            return urlAngular;
        }
    }
}