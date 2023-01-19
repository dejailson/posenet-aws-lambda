import { handlerPath } from '@libs/handler-resolver';

const URI = 'function/posenet'

export const heathCheck = {
    handler: `${handlerPath(__dirname)}/handler.heathCheck`,
    events: [
        {
            http: {
                method: 'get',
                path: `${URI}/heath-check`,
            },
        },
    ],
};

export const poseDetection = {
    handler: `${handlerPath(__dirname)}/handler.poseDetection`,
    events: [
        {
            http: {
                method: 'post',
                path: `${URI}`,
            },
        },
    ],
}