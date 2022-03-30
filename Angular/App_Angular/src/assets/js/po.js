// JavaScript source code


$(document).ready(
    function () {

        $.ajax({
            url: "/Home/GetListPO",
            method: "POST",
            data: {
                index: 1
            },
            success: function (response) {

                for (var i = 0; i < response.length; i++) {
                    
                    var item = "<tr>" +
                        '<td><a href="/purchaseorderdetail/index/' + response[i].order_no+'">' + response[i].order_no + '</a></td>' +
                        '<td>' + response[i].supplier1 + '</td>' +
                        '<td>' + response[i].stock_site + '</td>' +
                        '<td>' + response[i].stock_name + '</td>' +
                        '<td>' + timestamp2Datetime(response[i].order_date) + '</td>' +
                        '<td>' + timestamp2Datetime(response[i].last_update) + '</td>'
                    if (response[i].sent_email) {
                        item += '<td>' + '<input type="checkbox" checked disabled="disabled">' + '</td>'
                    } else {
                        item += '<td>' + '<input type="checkbox" disabled="disabled">' + '</td>'
                    }
                    item += "</tr>"

                    $("#list_po > tbody:last-child").append(
                        item
                    );
                }

            },
            error: function (response) {
                console.log("error");
            },
        })
    }
)

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
