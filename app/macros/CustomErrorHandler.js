class CustomErrorHander extends Error{
    constructor(status,message){
        super()
        this.status= status
        this.message = message
    }

    static notFoundException(message="not found ") {
        return new CustomErrorHander(404,message)
    }
    static serverError(message="somethin went wrong!!") {
        return new CustomErrorHander(505,message)
    }
}

export default CustomErrorHander