import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "test",
    lastName: "test",
    email: "test@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "anciana.png",
    friends: [],
    location: "Bilbao",
    occupation: "Cine",
    viewedProfile: 14,
    impressions: 850,
    createdAt: 05062023,
    updatedAt: 05062023,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Olivia",
    lastName: "Marcos",
    email: "olivia@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "anciana.png",
    friends: [],
    location: "Bilbao",
    occupation: "Cine",
    viewedProfile: 1,
    impressions: 550,
    createdAt: 05062023,
    updatedAt: 05062023,
    __v: 0,
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    firstName: "Olivia",
    lastName: "Marcos",
    location: "Bilbao",
    description: "Apasionada del cine",
    picturePath: "anciana.png",
    userPicturePath: "anciana.png",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
    ]),
    comments: ["Buena compañía", "Buena conocedora del mundo del cine"],
  },
];
