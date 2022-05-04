using WebAppMVCPurchaseOrder.Models.AccountRepository;
using WebAppMVCPurchaseOrder.Models.Context;

namespace WebAppMVCPurchaseOrder.Interfaces.Services
{
    public interface IAccountServices
    {
        public Task<UserModel> Login(User user);
        public Task<UserModel> CheckToken(string token);
    }
}
