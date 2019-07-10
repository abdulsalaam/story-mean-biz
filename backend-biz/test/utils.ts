/* @abdul : 07-07-2019 */
import * as Database from "../src/database";

export function createStoryDummy(userId?: string, title?: string, published? : boolean, description?: string) {
  var story = {
    title: title || "dummy story",
    published : published || 0,
    description: description || "I'm a dummy story!"
  };

  if (userId) {
    story["userId"] = userId;
  }

  return story;
}

export function createUserDummy(username?: string) {
  var user = {
    username: username || "dummy@mail.com",
    name: "Dummy Jones",
    userType : "customer",
    password: "123123"
  };

  return user;
}

export function clearDatabase(database: Database.IDatabase, done: MochaDone) {
  var promiseUser = database.userModel.remove({});
  var promiseStory = database.storyModel.remove({});

  Promise.all([promiseUser, promiseStory])
    .then(() => {
      done();
    })
    .catch(error => {
      console.log(error);
    });
}

export function createSeedStoryData(database: Database.IDatabase, done: MochaDone) {
  return database.userModel
    .create(createUserDummy())
    .then(user => {
      return Promise.all([
        database.storyModel.create(
          createStoryDummy(user._id, "Story 1", true, "Some dummy data 1")
        ),
        database.storyModel.create(
          createStoryDummy(user._id, "Story 2", true, "Some dummy data 2")
        ),
        database.storyModel.create(
          createStoryDummy(user._id, "Story 3", true,"Some dummy data 3")
        )
      ]);
    })
    .then(story => {
      done();
    })
    .catch(error => {
      console.log(error);
    });
}

export function createSeedUserData(database: Database.IDatabase, done: MochaDone) {
  database.userModel
    .create(createUserDummy())
    .then(user => {
      done();
    })
    .catch(error => {
      console.log(error);
    });
}

export async function login(server, config, user) {
  if (!user) {
    user = createUserDummy();
  }

  return server.inject({
    method: "POST",
    url: config.routePrefix + "/users/login",
    payload: { username: user.username, password: user.password }
  });
}
