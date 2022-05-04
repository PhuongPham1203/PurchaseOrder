using WebAppMVCPurchaseOrder.Interfaces.Services;
using WebAppMVCPurchaseOrder.Models.AccountRepository;
using WebAppMVCPurchaseOrder.Models.Context;
using WebAppMVCPurchaseOrder.Services.RepositoryServices;

namespace WebAppMVCPurchaseOrder.Services.AccountServices
{
    public class AccountServices : IAccountServices
    {
        private IRepositoryServices _pors;

        public AccountServices(IRepositoryServices porServices)
        {
            _pors = porServices;
        }

        public async Task<UserModel> Login(User user)
        {
            try
            {
                var userModel = await this._pors.AccountRepository.ValidationUser(user.Username, user.Password);

                if(userModel == null)
                {
                    return null;
                }

                return userModel;
            }catch(Exception ex)
            {
                throw ex;
            }
            
        }
    }
}
