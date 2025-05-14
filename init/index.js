require("dotenv").config({path:"../.env"});

const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/things");

const dbUrl = process.env.ATLASDB_URL;
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68241dc84b54cdd1610ff35f",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
