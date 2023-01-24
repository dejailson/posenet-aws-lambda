import ImageLoader from '@utils/canvas/imageLoader'

import PoseDetectionRequest from '@entities/poseDetectionRequest';
import AuthFireBaseService from '@utils/services/authFireBaseService'
import PosenetProcessService from '@utils/services/posenetProcessService'
import PosenetBodyTypeError  from '@errors/posenetBodyTypeError';
import {ERROR_UNHANDLEABLE_TYPE, ERROR_NO_ACCESS, STATUS_ERROR_NO_ACCESS} from '@utils/handler/handler_code'
import {fildsCheck,configurationCheck} from '@utils/handler/handler_function'
export default class PosenetService {
    constructor(
        private authFireBaseService:AuthFireBaseService,
        private posenetProcess:PosenetProcessService
        ){}

    async poseDetection(requestBody){
        
        // console.log(`body.token -> ${JSON.stringify(body)}`)
        
        //var body = await JSON.parse(request.body);
        const { userRecord, auth } = await this.authFireBaseService.authIdToken(requestBody.token);

        if (auth){
        //verificar tipo dos campos
            if (typeof requestBody.mobileNetMultiplier == 'string'){
                //console.log("String_01");
                requestBody.mobileNetMultiplier = Number(requestBody.mobileNetMultiplier);
                if (isNaN(requestBody.mobileNetMultiplier)){
                    throw new PosenetBodyTypeError(ERROR_UNHANDLEABLE_TYPE.concat(" - mobileNetMultiplier"), 400);
                }
                
            }
            if (typeof requestBody.poseNetOutputStride == 'string'){
                //console.log("String_02");
                requestBody.poseNetOutputStride = Number(requestBody.poseNetOutputStride);
                if (isNaN(requestBody.poseNetOutputStride)){
                    throw new PosenetBodyTypeError(ERROR_UNHANDLEABLE_TYPE.concat(" - poseNetOutputStride"), 400);
                }
                
            }
            if (typeof requestBody.poseNetQuantBytes == 'string'){
                //console.log("String_03");
                requestBody.poseNetQuantBytes = Number(requestBody.poseNetQuantBytes);
                if (isNaN(requestBody.poseNetQuantBytes) ){
                    throw new PosenetBodyTypeError(ERROR_UNHANDLEABLE_TYPE.concat(" - poseNetQuantBytes"), 400);
                }
                
            }
            //console.log(`inputResolution_01: ${JSON.stringify(body.inputResolution)}`);
            if (
                (typeof requestBody.inputResolution.width == 'string') || 
                (typeof requestBody.inputResolution.height == 'string')
                ){
                //console.log("String_04");
                requestBody.inputResolution.width = Number(requestBody.inputResolution.width);
                requestBody.inputResolution.height = Number(requestBody.inputResolution.height);
                if (isNaN(requestBody.inputResolution.width) || isNaN(requestBody.inputResolution.height)){
                    throw new PosenetBodyTypeError(ERROR_UNHANDLEABLE_TYPE.concat(" - poseNetInputResolution"), 400);
                }
            }
            //console.log(`device_01: ${JSON.stringify(body.deviceResolution)}`);
            if (
                (typeof requestBody.deviceResolution.width == 'string') ||
                (typeof requestBody.deviceResolution.height == 'string')
                ){
                //console.log("String_05");
                requestBody.deviceResolution.width = Number(requestBody.deviceResolution.width);
                requestBody.deviceResolution.height = Number(requestBody.deviceResolution.height);
                if (isNaN(requestBody.deviceResolution.width) || isNaN(requestBody.deviceResolution.height)){
                    throw new PosenetBodyTypeError(ERROR_UNHANDLEABLE_TYPE.concat(" - poseNetInputResolution"), 400);
                }
            }
            //testes resolution
            // console.log(`\nInput resolution: ${JSON.stringify(body.inputResolution)}`);
            // console.log(`Device resolution: ${JSON.stringify(body.deviceResolution)}`);

            fildsCheck(requestBody);
            configurationCheck(requestBody);
            console.log(`Image Rote Teste - Width => ${requestBody.deviceResolution.width}, Height => ${requestBody.deviceResolution.height}`)
            const imageLoaderUnit8 = new ImageLoader();
            const arrayUnit8 = await imageLoaderUnit8.getImageArrayUnit8(
                requestBody.base64string, 
                requestBody.deviceResolution.width, 
                requestBody.deviceResolution.height
            );

            const poseDetectionRequest = new PoseDetectionRequest(
                arrayUnit8,
                requestBody.mobileNetMultiplier, 
                requestBody.poseNetArchitecture,
                requestBody.poseNetOutputStride,
                requestBody.poseNetQuantBytes,
                requestBody.inputResolution,
                requestBody.deviceResolution
            )
            
            const pose = await this.posenetProcess.poseDetection(poseDetectionRequest)
            
            // TODO: remover o pool de thread
            // const pose = await new Promise((resolve, reject) => {
            //     pool.runTask({poseDetectionRequest, todo}, (err, result) => {
            //         if(err) return reject(err);
            //         return resolve(result);
            //     })
            // });

            // response.writeHead(200, DEFAULT_HEADER)
            // response.write(JSON.stringify(
            //     pose
            // ))
            return pose;
        } else {
            throw new PosenetBodyTypeError(ERROR_NO_ACCESS, STATUS_ERROR_NO_ACCESS);
        }
        
    }
}