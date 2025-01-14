import express from "express";
// import dotenv from "dotenv";
import ServerlessHttp from "serverless-http"
// import cors from "cors";
const allRoutes = import("../src/route/restRoute.js");
const newRoute =import("../src/controller/avatarController.js");
const app = express();
import mongoose from "mongoose";
import bodyParser from "body-parser";
// import multer from "multer";
// const router = express.Router();
// import { AvatarSchema } from "./src/model/avatarModel.js";

// import fs from "fs";

// const port = 4000;

// dotenv.config();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://phalakshacg01:Phallu*30101@cluster0.evvpc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"  , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// app.use(
//   cors({
//     credentials: true,
//     origin: ["http://localhost:3000", process.env.APP_URL],
//   })
// );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/.netlify/functions/app',(req, res)=>{
  return res.json({
    messages: "Hello World!"
  })
});

allRoutes(app);
newRoute(app);

// app.get("/", (req, res) =>
//   res.send(`Your node and express server is running on port: ${port}`)
// );
// //avatar
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/addavatar", upload.single("testavatar"), (req, res) => {
//   const saveImage = AvatarSchema({
//     userid: req.body.userid,
//     avatar: {
//       data: fs.readFileSync("uploads/" + req.file.filename),
//       contentType: "image/png",
//     },
//   });
//   saveImage
//     .save()
//     .then((res) => {
//       console.log("image is saved");
//     })
//     .catch((err) => {
//       console.log(err, "error has occur");
//     });
//   res.send("image is saved");
// });
// //ga

// app.listen(port, () => {
//   console.log("restAPI is running on port: " + port);
// });
const handler = ServerlessHttp(app);

module.exports.handler = async(event, context)=>{
  const result = await handler(event, context);
  return result;
}

/*  
import express from "express";
import ServerlessHttp from "serverless-http";

const app = express();


app.get('/.netlify/functions/app', (req, res) => {
    return res.json({
        messages: "hello world!"
    })
})


const handler = ServerlessHttp(app);

module.exports.handler = async(event, context) => {
    const result = await handler(event, context);
    return result;
}
    */