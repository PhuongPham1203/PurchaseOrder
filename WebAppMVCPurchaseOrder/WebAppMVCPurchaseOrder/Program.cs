
using WebAppMVCPurchaseOrder.Models;
using WebAppMVCPurchaseOrder.Services.PurchaseOrderDetailServices;
using WebAppMVCPurchaseOrder.Services.PurchaseOrderServices;
using WebAppMVCPurchaseOrder.Services.RepositoryServices;
using WebAppMVCPurchaseOrder.Services.SendEmailServices;
/// <summary>
/// DDD :
///     User Interface Layer : Views, angular
///     Application Layer : Controllers
///     Domain Layer : Services
///     Infrastructure Layer : Models
/// </summary>
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
// Add Services
builder.Services.AddSingleton<purchaseorderContext>();
builder.Services.AddSingleton<PORepositoryServices>();
builder.Services.AddScoped<SendEmailServices>();
builder.Services.AddScoped<PurchaseOrderServices>();
builder.Services.AddScoped<PurchaseOrderDetailServices>();


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

