require('dotenv').config();
const jwt = require("jsonwebtoken");


const generatePolicy = (principalId, effect, resource) => {
  const response = {};
  response.principalId = principalId;
  
  if (effect && resource) {
    
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];

    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    response.policyDocument = policyDocument;
  }

  return response;
}

module.exports.handler = (event, context, callback) => {
  const token = event.authorizationToken;

  if (!token)   {
    return callback("Unauthorized", null);
  }

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return callback("Unauthorized", null);
    }

    return callback(null, generatePolicy(decoded._id, 'Allow', event.methodArn));
  });
};
