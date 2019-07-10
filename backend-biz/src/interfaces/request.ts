/* @abdul : 07-07-2019 */
import * as Hapi from "hapi";

export interface ICredentials extends Hapi.AuthCredentials {
  id: string;
  userType : string;
}

export interface IRequestAuth extends Hapi.RequestAuth {
  credentials: ICredentials;
}

export interface IRequest extends Hapi.Request {
  auth: IRequestAuth;
}

export interface ILoginRequest extends IRequest {
  payload: {
    username: string;
    password: string;
  };
}
