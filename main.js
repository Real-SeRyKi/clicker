var data = {points: 50, pointsbefore: null, items: {
    test: {
        buff: {
            type: "clickUpgrd",
            value: 2
        },
        quantity: 0,
        maxquantity: 5
    },
    test1: {
        buff: {
            type: "pps",
            value: 1
        },
        quantity: 0,
        maxquantity: 15
    }
}}

//function for rendering
const update = () => {
    $("#lbl-points").html(data.points)
    $("div.shop").children('div').each((i, e) => {
        if (data.points < $(e).find("span#price").text().replace("p", "") || data.items[$(e).attr("id")].maxquantity == data.items[$(e).attr("id")].quantity) {
            $(e).css("opacity", "50%")
        } else {
            $(e).css("opacity", "100%")
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
        console.log($(e).find("span#price").text().replace("p", ""))
        if (data.points < $(e).find("span#price").text().replace("p", "")) return
        data.items[$(e).attr("id")].quantity += 1;
        data.points -= $(e).find("span#price").text().replace("p", "")
        update()
    } )
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
    
    $(".pps").html(`pps: ${data.points - data.pointsbefore}`)
    data.pointsbefore = data.points
}, 1000)