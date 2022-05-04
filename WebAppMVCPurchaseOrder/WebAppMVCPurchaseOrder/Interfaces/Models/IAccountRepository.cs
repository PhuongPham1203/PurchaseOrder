using WebAppMVCPurchaseOrder.Models.AccountRepository;

namespace WebAppMVCPurchaseOrder.Interfaces.Models
{
    public interface IAccountRepository
    {
        public Task<UserModel> ValidationUser(string username, string password); 
        public Task<UserModel> ValidationUser(string token);
        public Task<UserModel> UpdateTokenUser(string username);

    }
}
