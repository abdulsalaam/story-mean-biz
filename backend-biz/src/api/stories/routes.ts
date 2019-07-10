import * as Hapi from "hapi";
import * as Joi from "joi";
import StoryController from "./story-controller";
import * as StoryValidator from "./story-validator";
import { jwtValidator } from "../users/user-validator";
import { IDatabase } from "../../database";
import { IServerConfigurations } from "../../configurations";

export default function (
  server: Hapi.Server,
  configs: IServerConfigurations,
  database: IDatabase
) {
  const storyController = new StoryController(configs, database);
  server.bind(storyController);

  server.route({
    method: "GET",
    path: "/stories/{id}",
    options: {
      handler: storyController.getStoryById,
      auth: "jwt",
      tags: ["api", "stories"],
      description: "Get story by id.",
      validate: {
        params: {
          id: Joi.string().required()
        },
        headers: jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Story founded."
            },
            "404": {
              description: "Story does not exists."
            }
          }
        }
      }
    }
  });

  server.route({
    method: "GET",
    path: "/stories",
    options: {
      handler: storyController.getStories,
      auth: "jwt",
      tags: ["api", "stories"],
      description: "Get all stories.",
      validate: {
        query: {
          top: Joi.number().default(5),
          skip: Joi.number().default(0)
        },
        headers: jwtValidator
      }
    }
  });

  server.route({
    method: "GET",
    path: "/allstories",
    options: {
      handler: storyController.getAllStories,
      auth: false,
      tags: ["api", "stories"],
      description: "Get all public stories.",
      validate: {
        query: {
          top: Joi.number().default(5),
          skip: Joi.number().default(0)
        }
      }
    }
  });

  server.route({
    method: "DELETE",
    path: "/stories/{id}",
    options: {
      handler: storyController.deleteStory,
      auth: "jwt",
      tags: ["api", "stories"],
      description: "Delete story by id.",
      validate: {
        params: {
          id: Joi.string().required()
        },
        headers: jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Deleted Story."
            },
            "404": {
              description: "Story does not exists."
            }
          }
        }
      }
    }
  });

  server.route({
    method: "PUT",
    path: "/stories/{id}",
    options: {
      handler: storyController.updateStory,
      auth: "jwt",
      tags: ["api", "stories"],
      description: "Update story by id.",
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: StoryValidator.updateStoryModel,
        headers: jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "Deleted Story."
            },
            "404": {
              description: "Story does not exists."
            }
          }
        }
      }
    }
  });

  server.route({
    method: "POST",
    path: "/stories",
    options: {
      handler: storyController.createStory,
      auth: "jwt",
      tags: ["api", "stories"],
      description: "Create a story.",
      validate: {
        payload: StoryValidator.createStoryModel,
        headers: jwtValidator
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "Created Story."
            }
          }
        }
      }
    }
  });
}
