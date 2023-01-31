const CONTENT_TYPE = {'content-type': 'application/json'}

const _200 = (response) => {
  return {
    CONTENT_TYPE,
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

const _400 = (response) => {
  return {
    CONTENT_TYPE,
    statusCode: 400,
    body: JSON.stringify(response)
  }
}


const _401 = (response) => {
  return {
    CONTENT_TYPE,
    statusCode: 401,
    body: JSON.stringify(response)
  }
}

const _404 = (response) => {
  return {
    CONTENT_TYPE,
    statusCode: 401,
    body: JSON.stringify(response)
  }
}
export {
  _200,
  _400,
  _401,
  _404
}