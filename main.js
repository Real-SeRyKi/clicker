//$.getJSON("config.json", (data) => {
    let data = {
        points: 0,
        pointsbefore: null,
        items: {
          pointenhancer: {
            buff: {
              type: "clickUpgrd",
              value: 2
            },
            quantity: 0,
            maxquantity: 5,
            price: 50,
            titlee: "Point enhancer",
            description: "Enhances your coins mined through button,<br>+2p when clicking button."
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

//Add items to shop
for (i = 0; Object.keys(data.items).length > 0; i++) {
    let div = document.createElement("div")
    div.setAttribute("id", Object.keys(data.items)[i])
    div.setAttribute("class", "item hover")

    let title = document.createElement("span")
    title.innerText = data.items[Object.keys(data.items)[i]]["titlee"]
    title.setAttribute("class", "title")

    let desc = document.createElement("span")
    desc.innerHTML = data.items[Object.keys(data.items)[i]].description

    let price = document.createElement("span")
    price.innerText = data.items[Object.keys(data.items)[i]].price + "p"
    price.setAttribute("class", "price")

    let quantity = document.createElement("span")
    quantity.innerText =  "Quantity: " + data.items[Object.keys(data.items)[i]].quantity

    div.appendChild(title)
    div.appendChild(document.createElement("br"))
    div.appendChild(desc)
    div.appendChild(document.createElement("br"))
    div.appendChild(price)
    div.appendChild(document.createElement("br"))
    div.appendChild(quantity)

    document.getElementsByClassName("shop")[0].appendChild(div)    
}

//function for rendering
const update = () => {
    $("#lbl-points").html(nFormatter(data.points, 2))
    $("div.shop").children('div').each((i, e) => {
        if (data.points < data.items[$(e).attr("id")].price || data.items[$(e).attr("id")].maxquantity == data.items[$(e).attr("id")].quantity) {
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
        if (data.points < data.items[$(e).attr("id")].price || data.items[$(e).attr("id")].maxquantity == data.items[$(e).attr("id")].quantity) return
        data.items[$(e).attr("id")].quantity += 1;
        data.points -= data.items[$(e).attr("id")].price
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
//})