const express = require("express");
const ticketRoutes = require("./routes/ticket");
const userRoutes = require("./routes/user");
const port = process.env.PORT;
require("./db/db");

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(ticketRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
