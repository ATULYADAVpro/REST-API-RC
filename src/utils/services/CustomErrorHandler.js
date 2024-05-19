class CustomErrorHandler extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.message = msg;
    }
    static alreadyExist(message) {
        return new CustomErrorHandler(400, message);
    }

    static notFoundData(message = 'No  found with the given criteria.') {
        return new CustomErrorHandler(400, message)
    }

}

export default CustomErrorHandler;