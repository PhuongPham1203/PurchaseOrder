
using Microsoft.EntityFrameworkCore;
using WebAppMVCPurchaseOrder.Interfaces.Services;
using WebAppMVCPurchaseOrder.Models.Context;
using WebAppMVCPurchaseOrder.Services.AccountServices;
using WebAppMVCPurchaseOrder.Services.PurchaseOrderDetailServices;
using WebAppMVCPurchaseOrder.Services.PurchaseOrderServices;
using WebAppMVCPurchaseOrder.Services.RepositoryServices;
using WebAppMVCPurchaseOrder.Services.SendEmailServices;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

// Add Services
builder.Services.AddScoped<purchaseorderContext>();

builder.Services.AddScoped<IAccountServices, AccountServices>();

builder.Services.AddScoped<IRepositoryServices, PORepositoryServices>();
builder.Services.AddScoped<SendEmailServices>();
builder.Services.AddScoped<PurchaseOrderServices>();
builder.Services.AddScoped<IPurchaseOrderDetailServices, PurchaseOrderDetailServices>();

builder.Services.AddDbContext<purchaseorderContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaulSqlServerConnection"));
});

// Add Logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();


// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/PurchaseOrder/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseCors(c=>c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=PurchaseOrder}/{action=Index}/{id?}");

app.Run();

