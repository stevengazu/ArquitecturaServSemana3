const express = require("express");
const app = express();

require("./config/db.config");

app.use(express.json());

const router = require("./config/routes.config");
app.use("/api",router);


const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});