﻿// view model Purchase Order Detail
function viewModelPOD() {
    var self = this;
    supplier_shortname: ko.observable();
    stock_site: ko.observable();
    order_date: ko.observable();
    note: ko.observable();

    supplier_name: ko.observable();
    stock_name: ko.observable();
    address: ko.observable();
    country: ko.observable();
    post_code: ko.observable();

    self.purchase_order_line = ko.observableArray([]);
}

$(document).ready(function () {
    $.ajax({

        url: "/PurchaseOrderDetail/GetData",
        method: "POST",
        data: {
            id: parseInt(document.getElementById("id_po").textContent)
        },
        success: function (response) {

            console.log("success GetData");
            //console.log(response.purchase_order,); # purchase_order, supplier, purchase_order_line, part, all_parts

            var vm = new viewModelPOD();
            vm.supplier_shortname = response.supplier.supplier_shortname;
            vm.stock_site = response.supplier.stock_site;
            vm.order_date = timestamp2Date(response.purchase_order.order_date);
            vm.note = response.purchase_order.note

            vm.supplier_name = response.supplier.supplier_name;
            vm.stock_name = response.supplier.stock_name;
            vm.address = response.purchase_order.address;
            vm.country = response.purchase_order.country;
            vm.post_code = response.purchase_order.post_code;


            for (let i = 0; i < response.part.length; i++) {

                var item_data = {
                    id: response.part[i].id,
                    part_number: response.part[i].part_number,
                    part_descripttion: response.part[i].part_descripttion,
                    manufacturer: response.part[i].manufacturer,

                    qty_ordered: response.purchase_order_line[i].qty_ordered,
                    order_date: timestamp2Date(response.purchase_order_line[i].order_date),
                    m2_buy_price: response.purchase_order_line[i].m2_buy_price,
                    memo: response.purchase_order_line[i].memo
                };
                vm.purchase_order_line.push(item_data);
                
            }


            ko.applyBindings(vm);

        },
        error: function (response) {
            console.log("error GetData");
        },

    })



})

function validateOrderDate() {
    var order_date = document.getElementById("order_date").value;


    if (new Date(order_date.value).getTime() < Date.now()) {
        document.getElementById("order_date").value = Date.now();
    }
}

function timestamp2Datetime(timestamp) {
    str = timestamp.replace(/\D/g, "");
    d = new Date(parseInt(str));

    var dateString =
        ("0" + d.getDate()).slice(-2) + "/" +
        ("0" + (d.getMonth() + 1)).slice(-2) + "/" +
        d.getFullYear() + " " +
        ("0" + d.getHours()).slice(-2) + ":" +
        ("0" + d.getMinutes()).slice(-2) + ":" +
        ("0" + d.getSeconds()).slice(-2);

    return dateString;
}

function timestamp2Date(timestamp) {
    str = timestamp.replace(/\D/g, "");
    d = new Date(parseInt(str));

    var dateString =
        d.getFullYear() + "-" +
        ("0" + (d.getMonth() + 1)).slice(-2) + "-" +
        ("0" + d.getDate()).slice(-2);

    return dateString;
}

