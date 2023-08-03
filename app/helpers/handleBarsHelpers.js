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
        switch(status){
            case 'order_placed': text='Order Received'; break;
            case 'order_confirmed': text = 'Order Confirmed'; break;
            case 'in_the_kitchen': text = 'In the Kitchen'; break;
            case 'begin_packed': text = 'Begin Packed'; break;
            case 'out_for_delivery': text = 'Out For Delivery'; break;
            case 'delivered': text = 'Order completed'; break;
            default: break;
        }
        return text
    })
     

}

export default handleBarsHelpers