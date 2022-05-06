using WebAppMVCPurchaseOrder.Interfaces.Services;
using WebAppMVCPurchaseOrder.Models.AccountRepository;
using WebAppMVCPurchaseOrder.Models.Context;
using WebAppMVCPurchaseOrder.Services.RepositoryServices;
using System.Security.Cryptography;
using System.Text;

namespace WebAppMVCPurchaseOrder.Services.AccountServices
{
    public class AccountServices : IAccountServices
    {
        private IRepositoryServices _pors;

        public AccountServices(IRepositoryServices porServices)
        {
            _pors = porServices;
        }

        public async Task<UserModel> CheckToken(string token)
        {
            try
            {
                var userModel = await this._pors.AccountRepository.ValidationUser(token);
                if (userModel == null)
                {
                    return null;
                }

                return userModel;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<UserModel> Login(User user)
        {
            try
            {
                var userModel = await this._pors.AccountRepository.ValidationUser(user.Username, user.Password);

                if (userModel == null)
                {
                    return null;
                }
                
                // create new token
                var salt = Guid.NewGuid().ToString()+DateTime.UtcNow.ToString();
                string token = HashString(userModel.Username,salt);
                userModel.Token = token;

                // update token on database
                await this._pors.AccountRepository.UpdateTokenUser(userModel);
                this._pors.Complete();
                return userModel;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        private string HashString(string text, string salt = "")
        {
            if (String.IsNullOrEmpty(text))
            {
                return String.Empty;
            }

            // using SHA256
            var sha = new SHA256Managed();
            byte[] textBytes = Encoding.UTF8.GetBytes(text + salt);
            byte[] hashBytes = sha.ComputeHash(textBytes);

            string hash = BitConverter.ToString(hashBytes).Replace("-", String.Empty);

            return hash;

        }
    }
}
