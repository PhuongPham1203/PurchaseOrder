using System;
using System.Collections.Generic;

namespace WebAppMVCPurchaseOrder.Models.Context
{
    public partial class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Token { get; set; } = null!;
        public int IdDepartment { get; set; }

        public virtual Department IdDepartmentNavigation { get; set; } = null!;
    }
}
