import PosenetBodyTypeError from './util/posenetBodyTypeError.js';
import { _400,_401,_404 } from './response-code.js';

const handlerError = (error) =>{
    return error => {
        console.log(`Erro message - ${error.message}`);
        console.log(`Erro name - ${error.name}`);
        console.log(`Erro fileName - ${error.fileName}`);

        var datetime = new Date();
        console.log(`\n\nLast Erro - ${datetime}`);

        if (error instanceof PosenetBodyTypeError){
            return processPosenetError(error)
        } else {
            const message={
                error: error.message,
                name: error.name,
            } 
            return _404(message)
            // console.log(`Erro status - 404`)
        }
    }
}

function processPosenetError(error){
    const message={
        error: error.message,
        name: error.name,
    } 
    if (error.status == 400){
        return _400(message)
    }
    if(error.status == 401){
        return _401(message)
    }
}

export {
    handlerError
}