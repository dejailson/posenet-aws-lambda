export default class PosenetBodyTypeError extends Error {
    constructor(public message, public status) {
        super(message);
        this.name = 'PosenetBodyTypeError';
    }
}