const { _200, _400  } = require('./src/util/handler-response.js')


exports.hello = (event, context, cb) => {
  const p = new Promise((resolve) => {
    resolve('success');
  });
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless Webpack (Ecma Script) v1.0! Second module!',
        input: event,
      },
      null,
      2
    ),
  };
  p.then(() => cb(null, _400('Go Serverless Webpack (Ecma Script) v1.0! Second module!'))).catch((e) => cb(e));
};
