import axios from "axios"
import moment from "moment";

function initAdmin(socket, setLimitCharacter) {
    let actualData     = [];
    let adminSectionId = document.getElementById('adminOrderSection');
    let tableContentId = document.getElementById('tableContentId');
    
    if(/admin/.test(location.pathname)){ 
        getInitialData();
    }
    async function getInitialData() {
        try {
            const data = await axios.get('/admin/orders', {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
            })
            if (data.status == 200) {
                actualData = data.data
               
                if (actualData.length==0) {
                    adminSectionId.innerHTML = generateMarkupOfNoOrderFound();
                     
                } else {
                    tableContentId.innerHTML = generateMarkup(actualData);
                    setLimitCharacter()
                }
            } else {
                throw new Error('something went wrong....')
            }
        } catch (error) {
            throw new Error(error.message)
        }

    }

    function generateMarkup(orderData) {
        let markup = [];
        let string = '';
        let count = 0;
        orderData.forEach((element, index) => {
            let innercount=0;
            string = `
        <tr>
            <td class=" px-4 py-2  border border-white">${++count} </td>
            <td class=" py-2  border border-white">
                <table class="w-full border border-black-400">
                    <thead>
                        <tr class=" font-bold  text-left">
                            <th class="px-4 py-2 border border-black-400">Order Id</th>
                            <th class="px-4 py-2 border border-black-400">Name - Quantity</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="px-4 py-2 border border-black-400"><abbr title=${element._id}
                                    class="no-underline limit-length text-[#b23301]">${(element._id)}</abbr></td>
                            <td class="px-4 py-2 border border-black-400">`;

                            Object.values(element.orders).forEach(elem1 => {
                               string +=`${++innercount}. ${ elem1.item.name } - ${elem1.qty } <br>`
                             });
                           string+= `</td>
                        </tr>
                    </tbody>
                </table>

            </td>
            <td class=" py-2  border border-white">
                <table class="w-full border border-black-400">
                    <thead>
                        <tr class=" font-bold  text-left">
                            <th class="px-4 py-2 border border-black-400">Name</th>
                            <th class="px-4 py-2 border border-black-400">Email</th>
                            <th class="px-4 py-2 border border-black-400">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="px-4 py-2 border border-black-400">${element.customerId.name}</td>
                            <td class="px-4 py-2 border border-black-400"> <abbr
                                    title="${element.customerId.email}"
                                    class="no-underline limit-length">${element.customerId.email}</abbr></td>
                            <td class="px-4 py-2 border border-black-400">${element.address}</td>
                        </tr>
                    </tbody>
                </table>

            </td>
            <td class=" px-4 py-2  border border-white">
                 <div class="inline-block relative w-[10rem]">
                <form actio="/admin/order/status" method="POST">
                    <input type="hidden" name="orderId" value="${element._id}"/>
                    <select name="status" onchange="this.form.submit()" class="cursor-pointer font-bold block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value="1" ${getSelectedStatus(element.orderStatus,1)}>${getStatusText(1)}</option>
                        <option value="2" ${getSelectedStatus(element.orderStatus,2)}>${getStatusText(2)}</option>
                        <option value="3" ${getSelectedStatus(element.orderStatus,3)}>${getStatusText(3)}</option>
                        <option value="4" ${getSelectedStatus(element.orderStatus,4)}>${getStatusText(4)}</option>
                        <option value="5" ${getSelectedStatus(element.orderStatus,5)}>${getStatusText(5)}</option>
                        <option value="6" ${getSelectedStatus(element.orderStatus,6)}>${getStatusText(6)}</option>
                    </select>
                </form>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.348 8z"/>
                    </svg>
                </div>
            </div>
            </td>
            <td class=" px-4 py-2  border border-white">${moment(element.createdAt).format('MMMM D,YYYY h:mm A')}</td>
        </tr>`;
            markup[index] = string
        });
        return markup
    }

    function getSelectedStatus(status, index) {
        let text = '';
        let statusObj = {}
        statusObj.order_placed = 1;
        statusObj.order_confirmed = 2;
        statusObj.in_the_kitchen = 3;
        statusObj.begin_packed = 4;
        statusObj.out_for_delivery = 5;
        statusObj.delivered = 6;
        let index1 = (status == 'delivered') ? statusObj[status] : statusObj[status]
        switch (index) {
            case 1:
                text = (index == index1) ? 'Selected' : '';
                break;
            case 2:
                text = (index == index1) ? 'Selected' : '';
                break;
            case 3:
                text = (index == index1) ? 'Selected' : '';
                break;
            case 4:
                text = (index == index1) ? 'Selected' : '';
                break;
            case 5:
                text = (index == index1) ? 'Selected' : '';
                break;
            case 6:
                text = (index == index1) ? 'Selected' : '';
                break;
            default:
                text = '';
                break;
        }
        return text
    }

    function getStatusText(status) {
        let index = status
        let text = '';
        switch (index) {
            case 1:
                text = 'Order Received';
                break;
            case 2:
                text = 'Order Confirmed';
                break;
            case 3:
                text = 'In the Kitchen';
                break;
            case 4:
                text = 'Begin Packed';
                break;
            case 5:
                text = 'Out For Delivery';
                break;
            case 6:
                text = 'Order completed';
                break;
            default:
                break;
        }
        return text
    }
    function generateMarkupOfNoOrderFound(){
        let text= `<div class="font-bold py-2 w-2/5 mx-auto text-center">  
            <p class="text-zinc-900  font-bold text-2xl">😮 No Orders Found.</p>
            <img src="/img/no-order.jpg" alt="no-order"/> 
            <a href="/" class="inline-block rounded-full text-white font-bold px-6 py-2 cursor-pointer bg-[#FE5F1E] shadow-2xl transition-all ease-in-out duration-1000 hover:bg-white hover:text-[#FE5F1E] border hover:border-[#FE5F1E] border-[#fff]">Go back</a>
        </div>`;
        return text;
    }

    socket.once('newOrder',(data)=>{
        actualData.unshift(data) 
        if(actualData.length!=0){
            var notyf = new Notyf({
                duration: 2000,
                position: {
                    x: 'right',
                    y: 'left',
    
                }
            });
            notyf.success('New Order Added by '+ data.customerId.name)
            tableContentId.innerHTML='';
            tableContentId.innerHTML = generateMarkup(actualData);
            setLimitCharacter()
        }else{
            adminSectionId.innerHTML = generateMarkupOfNoOrderFound();  
        }
    })

}

export default initAdmin