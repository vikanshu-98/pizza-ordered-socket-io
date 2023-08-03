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

    hbs.registerHelper('orderStatus',function(status){
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
    })
     

}

export default handleBarsHelpers