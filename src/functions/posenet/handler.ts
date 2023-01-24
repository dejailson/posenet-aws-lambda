import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { _200, _400, _401, _404 } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import poseDetectionFactory from "@factories/poseDetectionFactory";
import PosenetBodyTypeError  from '@errors/posenetBodyTypeError';

const posenet = poseDetectionFactory.generateInstance()

export const heathCheck = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const message = {
        status: "ok",
        health: "I'm Healthy!"
    }
    
    return _200({
        message
    })
})

export const poseDetection = middyfy(async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> =>{
    const requestBody = event.body
    try{
        const result = posenet.poseDetection(requestBody)
        return _200({
            result
        })
    }catch(error){
        handlerError(error)
    }
})

function handlerError (error){
    var datetime = new Date();
    console.log(`\n\nLast Erro - ${datetime}`);
    if (error instanceof PosenetBodyTypeError){
        if (error.status == 400 ){
            return _400(error.message)
        }

        if (error.status == 401){
            return _401(error.message)
        }
        //error.writeHead(error.status, DEFAULT_HEADER);
        // console.log(`Erro status - ${error.status}`)
    }

    const message = 'End Point Not Found.'
    return _404(message)
}

