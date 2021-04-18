import * as AWS from "aws-sdk";
import {
  CognitoUserPool
} from "amazon-cognito-identity-js";
import cognitoConfig from "../config/cognito.config";
AWS.config.region = cognitoConfig.region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: cognitoConfig.IdentityPoolId
});

export const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.UserPoolId,
  ClientId: cognitoConfig.ClientId,
});

export const getAuthenticatedUser = () => {
	return userPool.getCurrentUser();
};