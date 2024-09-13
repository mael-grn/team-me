export const ErrorTypes = {
    DEFAULT: 'An error occurred. Please try again later',
    NOUSER: 'This user does not exist. Try again with a different email or password',
    ALREADYEXISTS: 'This user already exists. Try again with a different email',
    CONNECTION: 'An error occurred while trying to connect to the server. Please try again later',
    NOAUTH: 'You are not authorized to access this resource',
    SERVER: 'An error occurred on the server. Please try again later'
}

export default class ServerResponse {



    constructor(success, errorType, data) {
        this.success = success;
        this.errorType = errorType;
        this.data = data;
    }
}

