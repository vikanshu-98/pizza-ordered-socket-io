import OrderedStatusEnum from "../enum/OrderedStatusEnum";

class OrderStatusService{

    static getDbStatusName(status_number){
        let status = null
        switch(status_number){
            case '1': status = OrderedStatusEnum.ORDER_RECEIVED;break;
            case '2': status = OrderedStatusEnum.ORDER_CONFIRMED; break;
            case '3': status = OrderedStatusEnum.IN_THE_KITCHEN;break;
            case '4': status = OrderedStatusEnum.BEGIN_PACKED;break;
            case '5': status = OrderedStatusEnum.OUT_FOR_DELIVERY;break;
            case '6': status = OrderedStatusEnum.ORDER_COMPLTED;break;
            default : return;
        }
        return status
    }
    static getStatusName(db_status){
        let status = null
        switch(db_status){
            case OrderedStatusEnum.ORDER_RECEIVED: status = OrderedStatusEnum.UI_ORDER_RECEIVED;break;
            case OrderedStatusEnum.ORDER_CONFIRMED: status = OrderedStatusEnum.UI_ORDER_CONFIRMED; break;
            case OrderedStatusEnum.IN_THE_KITCHEN: status = OrderedStatusEnum.UI_IN_THE_KITCHEN;break;
            case OrderedStatusEnum.BEGIN_PACKED: status = OrderedStatusEnum.UI_BEGIN_PACKED;break;
            case OrderedStatusEnum.OUT_FOR_DELIVERY: status = OrderedStatusEnum.UI_OUT_FOR_DELIVERY;break;
            case OrderedStatusEnum.ORDER_COMPLTED: status = OrderedStatusEnum.UI_ORDER_COMPLTED;break;
            default : return;
        }
        return status
    }
}

export default OrderStatusService