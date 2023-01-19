import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { _200 } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

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

    return _200({
        requestBody
    })
})

