var data = {
    points: 0,
    pointsbefore: null,
    items: {
        pointenhancer: {
            buff: {
                type: "clickUpgrd",
                value: 2
            },
            quantity: 0,
            maxquantity: 5
        },
        pointinvestment: {
            buff: {
                type: "pps",
                value: 1
            },
            quantity: 0,
            maxquantity: 15
        },
        lemonadestand: {
            buff: {
                type: "pps",
                value: 5
            },
            quantity: 0,
            maxquantity: 15
        },
        pointrefiner: {
            buff: {
                type: "clickUpgrd",
                value: 10
            },
            quantity: 0,
            maxquantity: 15
        },
        pointmine: {
            buff: {
                type: "pps",
                value: 20
            },
            quantity: 0,
            maxquantity: 15
        },
        pointfactory: {
            buff: {
                type: "pps",
                value: 100
            },
            quantity: 0,
            maxquantity: 15
        }
    }
}

function nFormatter(num, digits) {
    const lookup = [{
            value: 1,
            symbol: ""
        },
        {
            value: 1e3,
            symbol: "k"
        },
        {
            value: 1e6,
            symbol: "M"
        },
        {
            value: 1e9,
            symbol: "G"
        },
        {
            value: 1e12,
            symbol: "T"
        },
        {
            value: 1e15,
            symbol: "P"
        },
        {
            value: 1e18,
            symbol: "E"
        }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
//function for rendering
const update = () => {
    $("#lbl-points").html(nFormatter(data.points, 2))
    $("div.shop").children('div').each((i, e) => {
        if (data.points < parseInt($(e).find("span#price").attr("data-price"), 10) || data.items[$(e).attr("id")].maxquantity == data.items[$(e).attr("id")].quantity) {
            $(e).css("opacity", "25%")
            $(e).removeClass("hover")
        } else {
            $(e).css("opacity", "100%")
            $(e).addClass("hover")
        }
    })
    $("div.shop").children('div').each((i, e) => {
        $(e).find("span#quantity").html(`Quantity: ${data.items[$(e).attr("id")].quantity}`)
    })
}

$(".btn-main").click(() => {
    Object.values(data.items).forEach(e => {
        if (e.buff.type == "clickUpgrd") {
            data.points += e.buff.value * e.quantity
        }
    })
    data.points += 1;
    update()
})

$("div.shop").children('div').each((i, e) => {
    $(e).click(() => {
        if (data.points < parseInt($(e).find("span#price").attr("data-price"), 10) || data.items[$(e).attr("id")].maxquantity == data.items[$(e).attr("id")].quantity) return
        data.items[$(e).attr("id")].quantity += 1;
        data.points -= parseInt($(e).find("span#price").attr("data-price"), 10)
        update()
    })
})
update()
//pps
setInterval(() => {
    Object.values(data.items).forEach(e => {
        if (e.buff.type == "pps") {
            data.points += e.buff.value * e.quantity

        }
    })
    update()

    if (data.pointsbefore == null || data.pointsbefore > data.points) {
        data.pointsbefore = data.points
        return
    }

    $(".pps").html(`pps: ${nFormatter(data.points - data.pointsbefore, 2)}`)
    data.pointsbefore = data.points
}, 1000)