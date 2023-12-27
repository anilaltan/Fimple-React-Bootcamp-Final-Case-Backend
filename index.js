const express = require("express");
var cors = require("cors");
const ticketRoutes = require("./routes/ticket");
const userRoutes = require("./routes/user");
const port = process.env.PORT;
require("./db/db");

const app = express();

// var whitelist = ["http://localhost:5173", "http://127.0.0.1:5173"];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions)); // define this middeware before the all routes as you defined.
app.use(cors());

app.use(express.json());
app.use(userRoutes);
app.use(ticketRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
