const express = require("express");
const router = require("./src/event/event.route");
const { connectdb } = require("./src/utils/db.util");
const errorHandler = require("./src/utils/middleware/error.middleware");
const mainRouter = require("./src/index.route");

require("dotenv").config();

const app = express();
connectdb();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/", mainRouter);


app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
