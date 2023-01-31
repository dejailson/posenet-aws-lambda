import { _200  } from './src/util/response-code.js'

const check = (event, context, cb) => {
    cb(null, _200('I am Health!'))
};

export {
    check
}