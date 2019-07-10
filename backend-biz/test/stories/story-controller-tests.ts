/* @abdul : 07-07-2019 */
import * as chai from "chai";
import StoryController from "../../src/api/stories/story-controller";
import { IStory } from "../../src/api/stories/story";
import { IUser } from "../../src/api/users/user";
import * as Configs from "../../src/configurations";
import * as Server from "../../src/server";
import * as Database from "../../src/database";

import * as Utils from "../utils";

const configDb = Configs.getDatabaseConfig();
const database = Database.init(configDb);
const assert = chai.assert;
const serverConfig = Configs.getServerConfigs();

describe("StoryController Tests", () => {
  let server;

  before(done => {
    Server.init(serverConfig, database).then(s => {
      server = s;
      done();
    });
  });

  beforeEach(done => {
    Utils.createSeedUserData(database, done);
    Utils.createSeedStoryData(database, done);
  });

  afterEach(done => {
    Utils.clearDatabase(database, done);
  });
  
  
   it("Create Store Story for customer with title & description", async () => {
       
    var user = Utils.createUserDummy();

    const loginResponse = await Utils.login(server, serverConfig, user);
    assert.equal(200, loginResponse.statusCode);
    var login: any = JSON.parse(loginResponse.payload);
   
    
    var story = {
        "title": "Demo lorem",
        "published": 1,
        "description": "This is description: lorem lipsm"
    };

    const res = await server.inject({
      method: "POST",
      url: serverConfig.routePrefix + "/storys",
      payload: story,
      headers: { authorization: login.token }
    });

    var responseBody: any = JSON.parse(res.payload);
    //console.log(responseBody);
    assert.equal(201, res.statusCode);
    assert.equal(45, responseBody.discount);
  });
  
  
  
});
