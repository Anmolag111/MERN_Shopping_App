const express = require("express");
const app = new express();
const mongoose = require("./db/connection");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("./utils/logger");

// Custom MiddleWares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// API routes
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/category"));
app.use("/api", require("./routes/product"));
app.use("/api", require("./routes/order"));
app.use("/api", require("./routes/paymentBRoutes"));
app.use("/api", require("./routes/stripepayment"));

// Configuring PORT Address
const PORT = process.env.PORT || 1234;

// starting server
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
