using Microsoft.EntityFrameworkCore;
using WebAppMVCPurchaseOrder.Interfaces.Models;
using WebAppMVCPurchaseOrder.Models.Context;
using WebAppMVCPurchaseOrder.Models.Repository;

namespace WebAppMVCPurchaseOrder.Models.AccountRepository
{
    public class AccountRepository : Repository<AccountRepository>, IAccountRepository
    {
        public AccountRepository(DbContext contex) : base(contex)
        {
        }
        public purchaseorderContext ModelSQLserver
        {
            get { return Context as purchaseorderContext; }

        }

        public Task<UserModel> UpdateTokenUser(string username)
        {
            throw new NotImplementedException();
        }

        public async Task<Boolean> UpdateTokenUser(UserModel userModel)
        {
            try
            {
                var user = await ModelSQLserver
                    .Users
                    .Where(u=>u.Username == userModel.Username)
                    .SingleAsync();
                if (user == null)
                {
                    throw new Exception("User not exit");
                }

                user.Token = userModel.Token;

                return true;

                
            }catch (Exception ex)
            {
                throw ex;
            }

            return false;
        }

        public async Task<UserModel> ValidationUser(string username, string password)
        {
            try
            {
                var user = await ModelSQLserver
                    .Users
                    .Where(u => u.Username == username && u.Password == password)
                    .Select(u => new UserModel()
                    {
                        Username = u.Username,
                        Token = u.Token,
                        Department = u.IdDepartmentNavigation.Name

                    })
                    .SingleOrDefaultAsync();

                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public async Task<UserModel> ValidationUser(string token)
        {
            try
            {
                var user = await ModelSQLserver
                    .Users
                    .Where(u => u.Token == token)
                    .Select(u => new UserModel()
                    {
                        Username = u.Username,
                        Token = u.Token,
                        Department = u.IdDepartmentNavigation.Name

                    })
                    .SingleOrDefaultAsync();

                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
