class CustomErrorHander extends Error{
    constructor(status,message){
        super()
        this.status= status
        this.message = message
    }

    static notFoundException(message="not found ") {
        return new CustomErrorHander(404,message)
    }
}

export default CustomErrorHander