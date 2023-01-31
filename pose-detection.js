import {} from 'dotenv/config';
import {
    _200
} from './src/util/response-code.js'
import {
    generateInstance
} from './src/factories/poseDetectionFactory.js'

import {
    generateInstanceAuthFireBase
} from './src/factories/authFireBaseFactory.js'
//  const {
//      generateInstanceAuthFireBase
//  } = require('./src/factories/authFireBaseFactory.js')

//  const {
//      pose_detection
//  } = require('./src/processor/pose-detection.js')
//  const {
//      handlerError
//  } = require('./src/util/handlerError.js')

const authFireBaseService = generateInstanceAuthFireBase();
const posenetService = generateInstance();

const detection = async (event, context, cb) => {
    const processed = await pose_detection(event.body, authFireBaseService, posenetService)

    processed.then(() => cb(null, _200(result))).catch((error) => cb(handlerError(error)));
    //cb(null, _200('Process...!'))
};

export {
    detection
}