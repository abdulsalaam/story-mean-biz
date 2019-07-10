import * as Hapi from "hapi";
import * as Boom from "boom";
import { IStory } from "./story";
import { IUser } from "../users/user";
import { IDatabase } from "../../database";
import { IServerConfigurations } from "../../configurations";
import { IRequest } from "../../interfaces/request";
import { ILogging } from "../../plugins/logging/logging";
import * as moment from 'moment';
//Custom helper module
import * as Helper from "../../utils/helper";

export default class StoryController {
  private database: IDatabase;
  private configs: IServerConfigurations;

  constructor(configs: IServerConfigurations, database: IDatabase) {
	this.configs = configs;
	this.database = database;
  }


  public async createStory(request: IRequest, h: Hapi.ResponseToolkit) {

     console.log('request.payload:', request.payload);
	var newStory: IStory = <IStory>request.payload;
	newStory.userId = request.auth.credentials.id;
	try {
	  const id = request.auth.credentials.id;
	  let user: IUser = await this.database.userModel.findById(id);
	  let story: IStory = await this.database.storyModel.create(newStory);
	  return h.response(story).code(201);
	} catch (error) {
	  return Boom.badImplementation(error);
	}
  }

  public async updateStory(request: IRequest, h: Hapi.ResponseToolkit) {
	let userId = request.auth.credentials.id;
	let _id = request.params["id"];

	try {
	  let story: IStory = await this.database.storyModel.findByIdAndUpdate(
		{ _id, userId }, //ES6 shorthand syntax
		{ $set: request.payload },
		{ new: true }
	  );

	  if (story) {
		return story;
	  } else {
		return Boom.notFound();
	  }
	} catch (error) {
	  return Boom.badImplementation(error);
	}
  }

  public async deleteStory(request: IRequest, h: Hapi.ResponseToolkit) {
	let id = request.params["id"];
	let userId = request["auth"]["credentials"];

	let deletedStory = await this.database.storyModel.findOneAndRemove({
	  _id: id,
	  userId: userId
	});

	if (deletedStory) {
	  return deletedStory;
	} else {
	  return Boom.notFound();
	}
  }

  public async getStoryById(request: IRequest, h: Hapi.ResponseToolkit) {
	let userId = request.auth.credentials.id;
	let _id = request.params["id"];

	let story = await this.database.storyModel.findOne({ _id, userId })
	  .lean(true);

	if (story) {
	  return story;
	} else {
	  return Boom.notFound();
	}
  }

  public async getStories(request: IRequest, h: Hapi.ResponseToolkit) {
	let userId = request.auth.credentials.id;
	let top = request.query["top"];
	let skip = request.query["skip"];
	let stories = await this.database.storyModel
	  .find({ userId: userId })
	  .lean(true)
	  .skip(skip)
	  .limit(top);

	return stories;
  }


  public async getAllStories(request: IRequest, h: Hapi.ResponseToolkit) {
	let top = request.query["top"];
	let skip = request.query["skip"];
	let stories = await this.database.storyModel
	  .find({})
	  .lean(true)
	  .skip(skip)
	  .limit(top);

	return stories;
  }
}
