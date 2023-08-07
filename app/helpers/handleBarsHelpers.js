import hbs from 'hbs'
import moment from 'moment'
const handleBarsHelpers=()=>{
    hbs.registerHelper('ternaryOperator',(value)=>{
        return (value!=null) ? true:false
    }),
    hbs.registerHelper('nullCheckCondition',(object)=>{
        if(object){
            return object.totalQty
        }else{
            return '0'
        } 
    }),
    hbs.registerHelper('isEmptyOrNot',(object)=>{
        if(object.lenth==0){
            return true
        }else{
            return false
        } 
    }),
    hbs.registerHelper('multipy',(v1,v2)=>{
        return v1*v2
    }),
    hbs.registerHelper('JSON2String', function (object) { return JSON.stringify(object) }),
    hbs.registerHelper('inc', function (value) {
        return parseInt(value) + 1
    }),
    hbs.registerHelper('changeDateFormat',function(object){
        return moment(object).format('DD-MM-YYYY hh:mm:ss A')
    })

    hbs.registerHelper('getDateFormat',function(object,isSingleOrder=false){
        return moment(object).format('MMMM D,YYYY h:mm A')
    })

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
        return index
    }
    hbs.registerHelper('orderStatus',function(status,getOnlyStatusName=false){
        let index  = (getOnlyStatusName==true)?status:statusCondition(status)
        let text   = '';
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
    })
    hbs.registerHelper('selected',function(status,index){
        let text='';
        let statusObj = {}
        statusObj.order_placed      = 1;
        statusObj.order_confirmed   = 2;
        statusObj.in_the_kitchen    = 3;
        statusObj.begin_packed      = 4;
        statusObj.out_for_delivery  = 5;
        statusObj.delivered         = 6;
        let index1 = (status=='delivered')?statusObj[status]:statusObj[status]
        switch(index){
            case 1: text = (index==index1)?'Selected':''; break;
            case 2: text = (index==index1)?'Selected':''; break;
            case 3: text = (index==index1)?'Selected':''; break;
            case 4: text = (index==index1)?'Selected':''; break;
            case 5: text = (index==index1)?'Selected':''; break;
            case 6: text = (index==index1)?'Selected':''; break;
            default: text=''; break;
        }
        return text
    })
    hbs.registerHelper('checkIsAdminLogin',function(users){
        const adminRole=['admin','superadmin']
        let url = '' 
        if(adminRole.includes(users.role))
            url = '/admin/orders'
        else url = '/customer/orders'
        return url
    })
     

}

export default handleBarsHelpers