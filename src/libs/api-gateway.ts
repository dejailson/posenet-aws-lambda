import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

const CONTENT_TYPE = {'content-type': 'application/json'}

export const _200 = (response: Record<string, unknown> | string) => {
  return {
    CONTENT_TYPE,
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export const _400 = (response: Record<string, unknown> | string) => {
  return {
    CONTENT_TYPE,
    statusCode: 400,
    body: JSON.stringify(response)
  }
}


export const _401 = (response: Record<string, unknown> | string) => {
  return {
    CONTENT_TYPE,
    statusCode: 401,
    body: JSON.stringify(response)
  }
}

export const _404 = (response: Record<string, unknown> | string) => {
  return {
    CONTENT_TYPE,
    statusCode: 401,
    body: JSON.stringify(response)
  }
}
