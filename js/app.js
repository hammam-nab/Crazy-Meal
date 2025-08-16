"use strict";
// oreder constructor function
function Order(mealName,mealPrice,mealImage){
    this.mealName = mealName;
    this.mealPrice = mealPrice;
    this.mealImage = mealImage
    this.timestamp = new Date().getTime(); 
}


// dom element
const addOrder = document.getElementById('add-orader');
const mealNameInput = document.getElementById('maelname');
const  mealPriceInput = document.getElementById('mealprice');
const  mealImageInput = document.getElementById('mealimage');
const orderList = document.getElementById('ordertable');
const currentYear = document.getElementById('current-year');
const clearOrders = document.getElementById('clear-orders');

// sent current year in footer
currentYear.textContent = new Date().getFullYear(); 

// initialize orders array
let orders = [];

// load orders from localstorage on page load
document.addEventListener('DOMContentLoaded', function(){
    loadOrders();
    displayOrders();
});

// Handle from submission
addOrder.addEventListener('submit', function(event){
    event.preventDefault();

    //get form values
    const mealName = mealNameInput.value;
    const mealPrice = parseFloat(mealPriceInput.value);
    const mealImage = mealImageInput.value;

    //create new order 
    const newOrder = new Order(mealName, mealPrice, mealImage);

    // Add to orders array
    orders.push(newOrder);

    // Save to localStorage
    saveOrders();
    
     // Display updated orders
    displayOrders();

    // Reset form
    addOrder.reset();
    
    // Focus on meal name input for next entry
    mealNameInput.focus();


});


//clear all data

clearOrders.addEventListener('click' , function(){
    if(confirm('Are you want to clear all orders ?')){
        orders = [];
        saveOrders();
        displayOrders();
    }
});



//save orders to localStorage
function saveOrders()
{
    localStorage.setItem('crazyMealOrders',JSON.stringify(orders));
}

// load orders from localstorage 
function loadOrders()
{
    const storedOrders = localStorage.getItem('crazyMealOrders');
    if(storedOrders){
        orders = JSON.parse(storedOrders);
    }
}


//Display order in the table 
function displayOrders(){
    //clear current orders display
    orderList.innerHTML='';

    //check if there are no orders
    if (orders.length==0){
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
        <td colspan="3" class="empty-message">No orders yet. Add an order above!</td>
        `;
        orderList.appendChild(emptyRow);
        return ;

    }

    //display each orders 
    orders.forEach(order =>
    {
        const orderRow = document.createElement('tr');
        orderRow.innerHTML = `
            <td>${order.mealName}</td>
            <td>$${order.mealPrice.toFixed(2) }</td>
            <td><img src="${order.mealImage}" alt="${order.mealName}" onerror="this.src='images/default-meal.jpg'"></td>

        `
        orderList.appendChild(orderRow);
    }
    )
}