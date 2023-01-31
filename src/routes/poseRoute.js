import PoseDetectionRequest from '../entities/poseDetectionRequest.js'
import { DEFAULT_HEADER, ERROR_NO_ACCESS , STATUS_ERROR_NO_ACCESS , ERROR_UNHANDLEABLE_TYPE } from '../util/util.js'
import { configurationCheck, fildsCheck } from '../util/utilBodyFunctions.js'
import PosenetBodyTypeError from '../util/posenetBodyTypeError.js';
import ImageLoader from '../util/images/canvasutil/imageLoader.js';

const routes = ({
    // posenetService,
    authFireBaseService,
    pool
}) => ({
    '/posenet/health:get': async (request, response) => {
       
        response.writeHead(200, DEFAULT_HEADER)
        response.write(JSON.stringify({
            status: "ok",
            health: "I'm Healthy!"
        }))
        return response.end()
    },

    '/:get': async (request, response) => {
        response.writeHead(200, DEFAULT_HEADER)
        // response.write(JSON.stringify({}))
        return response.end()
    },

    '/posenet:post': async (request, response) => {

        let body = request.body;

        // console.log(`body.token -> ${JSON.stringify(body)}`)
        
        //var body = await JSON.parse(request.body);
        const { userRecord, auth } = await authFireBaseService.authIdToken(body.token);

        if (auth){
        //verificar tipo dos campos
            if (typeof body.mobileNetMultiplier == 'string'){
                //console.log("String_01");
                body.mobileNetMultiplier = Number(body.mobileNetMultiplier);
                if (isNaN(body.mobileNetMultiplier)){
                    throw new PosenetBodyTypeError(ERROR_UNHANDLEABLE_TYPE.concat(" - mobileNetMultiplier"), 400);
                }
                
            }
            if (typeof body.poseNetOutputStride == 'string'){
                //console.log("String_02");
                body.poseNetOutputStride = Number(body.poseNetOutputStride);
                if (isNaN(body.poseNetOutputStride)){
                    throw new PosenetBodyTypeError(ERROR_UNHANDLEABLE_TYPE.concat(" - poseNetOutputStride"), 400);
                }
                
            }
            if (typeof body.poseNetQuantBytes == 'string'){
                //console.log("String_03");
                body.poseNetQuantBytes = Number(body.poseNetQuantBytes);
                if (isNaN(body.poseNetQuantBytes) ){
                    throw new PosenetBodyTypeError(ERROR_UNHANDLEABLE_TYPE.concat(" - poseNetQuantBytes"), 400);
                }
                
            }
            //console.log(`inputResolution_01: ${JSON.stringify(body.inputResolution)}`);
            if (
                (typeof body.inputResolution.width == 'string') || 
                (typeof body.inputResolution.height == 'string')
                ){
                //console.log("String_04");
                body.inputResolution.width = Number(body.inputResolution.width);
                body.inputResolution.height = Number(body.inputResolution.height);
                if (isNaN(body.inputResolution.width) || isNaN(body.inputResolution.height)){
                    throw new PosenetBodyTypeError(ERROR_UNHANDLEABLE_TYPE.concat(" - poseNetInputResolution"), 400);
                }
            }
            //console.log(`device_01: ${JSON.stringify(body.deviceResolution)}`);
            if (
                (typeof body.deviceResolution.width == 'string') ||
                (typeof body.deviceResolution.height == 'string')
                ){
                //console.log("String_05");
                body.deviceResolution.width = Number(body.deviceResolution.width);
                body.deviceResolution.height = Number(body.deviceResolution.height);
                if (isNaN(body.deviceResolution.width) || isNaN(body.deviceResolution.height)){
                    throw new PosenetBodyTypeError(ERROR_UNHANDLEABLE_TYPE.concat(" - poseNetInputResolution"), 400);
                }
            }
            //testes resolution
            // console.log(`\nInput resolution: ${JSON.stringify(body.inputResolution)}`);
            // console.log(`Device resolution: ${JSON.stringify(body.deviceResolution)}`);

            fildsCheck(body);
            configurationCheck(body);
            console.log(`Image Rote Teste - Width => ${body.deviceResolution.width}, Height => ${body.deviceResolution.height}`)
            const imageLoaderUnit8 = new ImageLoader();
            const arrayUnit8 = await imageLoaderUnit8.getImageArrayUnit8(
                body.base64string, 
                body.deviceResolution.width, 
                body.deviceResolution.height
            );

            const poseDetectionRequest = new PoseDetectionRequest({
                "base64string": arrayUnit8,
                "mobileNetMultiplier":body.mobileNetMultiplier, 
                "poseNetArchitecture":body.poseNetArchitecture,
                "poseNetOutputStride":body.poseNetOutputStride,
                "poseNetQuantBytes":body.poseNetQuantBytes,
                "poseNetInputResolution":body.inputResolution,
                "poseNetDeviceResolution":body.deviceResolution
            })

            const todo = 'posedetection';

            const pose = await new Promise((resolve, reject) => {
                pool.runTask({poseDetectionRequest, todo}, (err, result) => {
                    if(err) return reject(err);
                    return resolve(result);
                })
            });

            response.writeHead(200, DEFAULT_HEADER)
            response.write(JSON.stringify(
                pose
            ))
            return response.end();
        } else {
            throw new PosenetBodyTypeError(ERROR_NO_ACCESS, STATUS_ERROR_NO_ACCESS);
        }
    },

    '/posenet/keypoints:post': async (request, response) => {
        
        let body = request.body;
        let keypoints = body.keypoints.keypoints;

        Object.entries(keypoints).forEach(function(entry){
            
            const value = entry[1];
            Object.keys(value).forEach(function(index){

                if((index == "score")  && (typeof value[index] == 'string')){
                    //console.log('score é string');
                    keypoints[entry[0]][index] = Number(value[index]);
                }
                if((index == "position")  && ((typeof value[index].x == 'string') || (typeof value[index].y == 'string'))){
                    //console.log("position é string");
                    keypoints[entry[0]][index].x = Number(value[index].x);
                    keypoints[entry[0]][index].y = Number(value[index].y);
                }
            });
        });

        const { userRecord, auth } = await authFireBaseService.authIdToken(body.token);

        if (auth){
            // const  = await posenetService.getAdjacentKeyPoints(keypoints);
            const todo = 'adj_points';
            const adj_points = await new Promise((resolve, reject) => {
                pool.runTask({keypoints, todo}, (err, result) => {
                    if(err) return reject(err);
                    return resolve(result);
                })
            });

            //console.log(`Pontos adjascentes: \n${JSON.stringify(adj_points)}`);

            response.writeHead(200, DEFAULT_HEADER)
            response.write(JSON.stringify(
                adj_points
            ));
            return response.end();
        } else {
            throw new PosenetBodyTypeError(ERROR_NO_ACCESS, STATUS_ERROR_NO_ACCESS);
        }
    }
})

export {
    routes
}