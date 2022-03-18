// view model Purchase Order Detail
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

    
    self.sum_of_PO = ko.computed(function () {
        var sum = 0;
        for (var i = 0; i < self.purchase_order_line().length; i++) {
            sum += parseFloat(self.purchase_order_line()[i].total_price_in_line());
        }
        return sum;
    },self);
    
    
}

function viewModelPOL(qty_oder, m2_price) {
    var self = this;
    self.id = ko.observable();
    self.part_number = ko.observable();
    self.part_descripttion = ko.observable();
    self.manufacturer = ko.observable();

    self.qty_ordered = ko.observable(qty_oder);
    self.order_date = ko.observable();
    self.m2_buy_price = ko.observable(m2_price);
    self.memo = ko.observable();

    self.total_price_in_line = ko.computed(function () {
        return (self.qty_ordered() * self.m2_buy_price()).toLocaleString('pl-PL');
    }, self);
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

            var sum = 0; 

            for (let i = 0; i < response.part.length; i++) {
                var qty = response.purchase_order_line[i].qty_ordered;
                var price = response.purchase_order_line[i].m2_buy_price;
                
                var item_mode = new viewModelPOL(qty, price);
                item_mode.id = response.part[i].id;
                item_mode.part_number = response.part[i].part_number;
                item_mode.part_descripttion = response.part[i].part_descripttion;
                item_mode.manufacturer = response.part[i].manufacturer;

                item_mode.order_date = timestamp2Date(response.purchase_order_line[i].order_date);
                item_mode.memo = response.purchase_order_line[i].memo;

                vm.purchase_order_line.push(item_mode);
               
            }


            ko.applyBindings(vm);

            // validate Date PuchaseOrderLine
            var pol = document.getElementsByClassName("order_date_in_Line");

            for (var item of pol) {
                item.setAttribute("min", timestamp2Date(response.purchase_order.order_date));
            }

        },
        error: function (response) {
            console.log("error GetData");
        },

    })



})

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

function validateOrderDateLine(date_in_line) {
    var order_date_Head = document.getElementById("order_date_head").value;
    var order_date_Line = date_in_line.value;

    console.log(new Date(order_date_Line.value).getTime() < new Date(order_date_Head.value).getTime());

    if (new Date(order_date_Line).getTime() < new Date(order_date_Head).getTime()) {

        date_in_line.value = order_date_Head;
    }
}
