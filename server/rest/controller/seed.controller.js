const sizeRepository = require("../../repository/size.repository");
const userRepository = require("../../repository/user.repository");
const activityRepository = require("../../repository/activity.repository");
const locationRepository = require("../../repository/location.repository");
const boxRepository = require("../../repository/box.repository");

const sizeService = require("../../service/size.service");
const activityService = require("../../service/activity.service");
const userService = require("../../service/user.service");
const boxService = require("../../service/box.service");
const locationService = require("../../service/location.service");

const activityServiceMongo = activityService({ activityRepository });
const sizeServiceMongo = sizeService({ sizeRepository });
const userServiceMongo = userService({ userRepository });
const locationServiceMongo = locationService({ locationRepository });
const boxServiceMongo = boxService({ activityRepository, locationRepository, boxRepository });

const { User } = require("../../model/user.model");
const { Location } = require("../../model/location.model");
const { Activity } = require("../../model/activity.model");
const { Box } = require("../../model/box.model");
const { Size } = require("../../model/size.model");

const data = require("../../data/seedData.json");

const seedUser = async () => {
  User.collection.drop();
  data.users.forEach(async (user) => {
    await userServiceMongo.createNewUser(user);
  });
};

const seedActivity = async () => {
  Activity.collection.drop();
  data.activities.forEach(async (activity) => {
    await activityServiceMongo.createNewActivity(activity);
  });
};

const seedSizes = async () => {
  Size.collection.drop();
  data.sizes.forEach(async (size) => {
    await sizeServiceMongo.createNewSize(size);
  });
};

const seedLocations = async () => {
  Location.collection.drop();
  data.locations.forEach(async (location) => {
    await locationServiceMongo.createNewLocation(location);
  });
};

function getRandomInt(min, max) {
  const randNumber = Math.floor(Math.random() * max);
  if (randNumber < min) return min;
  if (randNumber > max) return max;
  return randNumber;
}

const createNewBox = async () => {
  const numberOfLocations = Object.keys(data.locations).length;
  const numberOfactivities = Object.keys(data.activities).length;
  const numberOfSizes = Object.keys(data.sizes).length;

  const originIndex = getRandomInt(0, numberOfLocations);
  const destinationIndex = getRandomInt(0, numberOfLocations);
  const numberOfTransferLocations = getRandomInt(2, numberOfLocations);
  const activityIndex = getRandomInt(0, numberOfactivities);
  const sizeIndex = getRandomInt(0, numberOfSizes);

  const activities = await activityServiceMongo.getAllActivities();

  const description =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
  const newOrder = {
    description,
    originId: data.locations[originIndex].identifier,
    destinationId: data.locations[destinationIndex].identifier,
    activityId: activities[activityIndex]._id,
    sizeCode: data.sizes[sizeIndex].code,
  };
  const newBox = await boxServiceMongo.createNewOrder(newOrder);

  // transfer order
  const numberOfTransferIt = getRandomInt(1, 5);
  for (let j = 0; j < numberOfTransferIt; j++) {
    for (let i = 0; i < numberOfTransferLocations; i++) {
      const activityIndex = getRandomInt(0, numberOfactivities);
      await boxServiceMongo.transferBox(
        newBox._id,
        data.locations[i].identifier,
        activities[activityIndex]._id
      );
    }
  }
};

const seedBoxes = async () => {
  Box.collection.drop();
  for (let j = 0; j < 200; j++) {
    await createNewBox();
  }
};

module.exports = {
  seedData: async (req, res, next) => {
    try {
      await seedUser();
      await seedLocations();
      await seedActivity();
      await seedSizes();
      return res.json({ message: "succesfully seeded data" });
    } catch (error) {
      next(error);
    }
  },
  seedBoxes: async (req, res, next) => {
    try {
      await seedBoxes();
      return res.json({ message: "succesfully seeded boxes" });
    } catch (error) {
      next(error);
    }
  },
};
