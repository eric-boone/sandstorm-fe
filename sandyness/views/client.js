$(document).ready(function(){
  getOrders().then(function(data){
    formatOrders(data).then(function(orders){
      printOrders(orders).then(function(orders){
        console.log("kept my promise")
      })
    })
  })
})

function getOrders(){
  return new Promise(function(resolve, reject){
    $.get('/allOrders', function(data){
      resolve(data);
    })
  })
}

function formatOrders(data){
  return new Promise(function(resolve, reject){
    var orders = [];
    for(var i = 0; i < data.data.length; i = i + 1){
      var order = data.data[i]
      console.log(order)
      orders.push(order)
    }
    resolve(orders)
  })
}

function printOrders(orders){
  return new Promise(function(resolve, reject){
    orders.forEach(function(order, index, array){
      var theOrder = document.createElement("div")
      var orderNameContainer = document.createElement("h1")
      var orderNameContent = document.createTextNode(order.name)
      orderNameContainer.appendChild(orderNameContent)
      var orderEmailContainer = document.createElement("h2")
      var orderEmailContent = document.createTextNode(order.email)
      orderEmailContainer.appendChild(orderEmailContent)
      var orderQuantityContainer = document.createElement("h3")
      var orderQuantityContent = document.createTextNode(order.quantity)
      orderQuantityContainer.appendChild(orderQuantityContent)
      theOrder.appendChild(orderNameContainer)
      theOrder.appendChild(orderEmailContainer)
      theOrder.appendChild(orderQuantityContainer)
      $('.orders').append(theOrder)
    })
  })
}
