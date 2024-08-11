const express = require("express");
const app = express();

const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/connect");


const committeeRoutes = require("./routes/Form");


dotenv.config();
const PORT = process.env.PORT;

//database connect
dbConnect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173","http://localhost:5173" , "https://labreportdepstar.vercel.app"],
  })
);


app.use("/api/v1", committeeRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running....",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});

