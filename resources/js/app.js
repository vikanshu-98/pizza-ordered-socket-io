const display = document.getElementById('sideMenu')
const hidden = document.getElementById('closeMenu')
const list = document.getElementById('list')
const axios = require('axios')
const moment = require('moment')
const socket = io()
 
import initAdmin from './admin'
 
  

 
display.onclick = function () {
    list.style.visibility = "visible"
    list.style.right = "0%"
}
hidden.onclick = function () {
    list.style.right = "-50%"
}
 

const successRegistered = document.getElementById('successRegistered')
if (successRegistered) {
    setTimeout(() => {
        successRegistered.remove()
    }, 3000)
}


const errorMessage = document.getElementById('errorMessage')
if (errorMessage) {
    setTimeout(() => {
        errorMessage.remove()
    }, 10000)
}


const btn = document.getElementById('loginBtn')
if (btn) {
    btn.onclick = () => {
        const loginForm = document.getElementById('loginForm')
        loginForm.submit()

    }

}


const allAddToCart = document.querySelectorAll('.add-to-cart')

allAddToCart.forEach((btn) => {
    btn.addEventListener('click', () => {
        const data = JSON.parse(btn.dataset.pizzaDetails)
        updateCart(data)
    })
})


async function updateCart(obj) {
    try {
        const notyf = new Notyf({
            duration: 2000,
            position: {
                x: 'right',
                y: 'left',
        
            }
        });
        const response = await axios.post('/updateCart', obj)
        if (response.data && response.status == 200) {
            document.getElementById('cartCounter').innerText = response.data.totalQty
            notyf.success('Items added to the cart')
        } else {
            notyf.error('something went wrong!!')
        }
    } catch (err) {
        notyf.error('something went wrong.')
    }

}

//current status blink 
const blinkerCurrentStatus = () => {
    let blink = document.getElementById('statusBlink')
    if(blink){
        if (!blink.style.backgroundColor) {
            blink.style.backgroundColor = 'white'
        } else {
            let rgbString = blink.style.backgroundColor
            if (rgbString == 'white')
                blink.style.backgroundColor = 'green'
            else {
                blink.style.backgroundColor = 'white'
            }
        }
    }
     
}

setInterval(blinkerCurrentStatus, 1000)

//status change code

let singleDocumentId = document.getElementById('singleOrderedData')
let nextStatus       = document.getElementById('nextStatus')
let AllList = document.querySelectorAll('.order-tracking')
let status = document.querySelectorAll('.order-status')
let order = (singleDocumentId) ? JSON.parse(singleDocumentId.value) : null
let span = document.createElement('span')
 
const updateStatus = function (order,isAdmin=false) {
    AllList.forEach(elem => {
        elem.classList.remove('completed')
    });
    let stepCompleted = true;
    status.forEach(elem => {
        if (stepCompleted) {
            elem.parentElement.classList.add('completed')
        }
       
        if (elem.dataset.status == order.orderStatus) {
            stepCompleted = false
            let day1 = moment(order.updatedAt).format('ddd,MMM DD');
            let day2 = moment(order.updatedAt).format(' hh:mm A'); 
            span.innerText =day1+' at '+day2

            elem.appendChild(span)

        }
    })
    if(isAdmin){
        const notyf = new Notyf({
            duration: 2000,
            position: {
                x: 'right',
                y: 'left',
        
            }
        });
        notyf.success('order status has been changed  to '+ statusCondition(order.orderStatus))
    }
         
    nextStatus.innerText=statusCondition(order.orderStatus)
}

if(location.pathname.includes('/customer'))
    updateStatus(order) 
function statusCondition(status){
    let text='';
    let statusObj = {}
    statusObj.order_placed      = 1;
    statusObj.order_confirmed   = 2;
    statusObj.in_the_kitchen    = 3;
    statusObj.begin_packed      = 4;
    statusObj.out_for_delivery  = 5;
    statusObj.delivered         = 6;
    let index = (status=='delivered')?statusObj[status]:statusObj[status]+1
    switch(index){
        case 1: text = 'Order Received'; break;
        case 2: text = 'Order Confirmed'; break;
        case 3: text = 'In the Kitchen'; break;
        case 4: text = 'Begin Packed'; break;
        case 5: text = 'Out For Delivery'; break;
        case 6: text = 'Order completed'; break;
        default: break;
    }
    return text
}

const setLimitCharacter= ()=>{ 
    let allDataThatToBeLimit   = document.querySelectorAll('.limit-length')
    allDataThatToBeLimit.forEach(elem=>{
        elem.innerText=`${elem.innerText.substr(0,10)}...` 
    })
}

const callAllFun=()=>{
    
    setLimitCharacter()  
}
 
document.onload =callAllFun()
 
 
//socket js starts here

 
if(order){ 
    socket.once('connect',()=>{
        socket.emit('join',`${order._id}_order`)
        
    })
} 

if(location.pathname.includes('/admin')){
    socket.emit('join','adminRoom')
}


socket.once('orderUpdate',(data)=>{
    const orderObj = {...order}
    orderObj.orderStatus = data.status
    orderObj.updatedAt = moment()
    updateStatus(orderObj,true)
    
})


initAdmin(socket,setLimitCharacter)

 