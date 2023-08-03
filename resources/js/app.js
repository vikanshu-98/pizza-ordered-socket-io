const display = document.getElementById('sideMenu')
const hidden = document.getElementById('closeMenu')
const list = document.getElementById('list')
const axios = require('axios')

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
    }, 3000)
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
        var notyf = new Notyf({
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
const blinkerCurrentStatus=()=> {
    let blink = document.getElementById('statusBlink')
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

setInterval(blinkerCurrentStatus, 1000)

//status change code

let singleDocumentId = document.getElementById('singleOrderData')
let AllList          = document.querySelectorAll('.status_line') 
let order            = (singleDocumentId)?singleDocumentId.value:null
order                = JSON.parse(order)
let smallElement     = document.createElement('small')


//socket js starts here

const socket = io()

socket.on('connect', () => {

})