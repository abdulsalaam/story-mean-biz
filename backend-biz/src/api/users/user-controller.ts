import * as Hapi from "hapi";
import * as Boom from "boom";
import * as Jwt from "jsonwebtoken";
import { IUser } from "./user";
import { IDatabase } from "../../database";
import { IServerConfigurations } from "../../configurations";
import { IRequest, ILoginRequest } from "../../interfaces/request";

export default class UserController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  private generateToken(user: IUser) {
    const jwtSecret = this.configs.jwtSecret;
    const jwtExpiration = this.configs.jwtExpiration;
    const payload = { id: user._id, userType: user.userType };

    return Jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
  }

  public async loginUser(request: ILoginRequest, h: Hapi.ResponseToolkit) {
    const { username, password } = request.payload;

    let user: IUser = await this.database.userModel.findOne({ username: username });

    if (!user) {
      return Boom.unauthorized("User does not exists.");
    }

    if (!user.validatePassword(password)) {
      return Boom.unauthorized("Password is invalid.");
    }

    return { token: this.generateToken(user) };
  }

  public async createUser(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      console.log('request user payload:', request.payload);
      let user: any = await this.database.userModel.create(request.payload);
      return h.response({ token: this.generateToken(user) }).code(201);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async updateUser(request: IRequest, h: Hapi.ResponseToolkit) {
    const id = request.auth.credentials.id;
    let userId = request.params["id"];
    console.log('param id:', userId);

    try {
      let user: IUser = await this.database.userModel.findByIdAndUpdate(
        userId,
        { $set: request.payload },
        { new: true }
      );
      return user;
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async deleteUser(request: IRequest, h: Hapi.ResponseToolkit) {
    const id = request.auth.credentials.id;
    console.log('auth id:', id);
    let userId = request.params["id"];
    console.log('param id:', userId);
    let user: IUser = await this.database.userModel.findByIdAndRemove(userId);
    return user;
  }

  public async infoUser(request: IRequest, h: Hapi.ResponseToolkit) {
    const id = request.auth.credentials.id;
    let userId = request.params["id"];
    console.log('param id:', userId);
    let user: IUser = await this.database.userModel.findById(userId);

    return user;
  }

   public async getUsers(request: IRequest, h: Hapi.ResponseToolkit) {
	let top = request.query["top"];
	let skip = request.query["skip"];
	let users = await this.database.userModel
	  .find()
	  .lean(true)
	  .skip(skip)
	  .limit(top);

	return users;
  }
}
