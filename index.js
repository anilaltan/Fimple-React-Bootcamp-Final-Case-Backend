const express = require("express");
var cors = require("cors");
const ticketRoutes = require("./routes/ticket");
const userRoutes = require("./routes/user");
const port = process.env.PORT;
require("./db/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(ticketRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
