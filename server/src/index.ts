require("dotenv").config();
import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import connectDB  from './db';
import authRoutes from './routes/auth.routes'; // Import your authentication routes
import targetAudienceRoutes from "./routes/targetAudience.routes"
import websiteRoutes from "./routes/website.routes"

import cookieParser from "cookie-parser";
const main =  async () => {
    await connectDB()
    
    
    const app = express()
    app.use(cookieParser());
    app.use(cors({ origin: ["*", "https://front-end-dynamic-website-dusky.vercel.app"] }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(multer().any());
    app.use(express.static("public"));
    app.use("/targetAudience", targetAudienceRoutes)
    app.use('/auth', authRoutes);
    app.use("/website", websiteRoutes)
    app.get("/", (_req, res) => {
        res.send("404 Page not found Test");
    });
    app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3002, () => {
        console.log(
          `Listen on port ${process.env.PORT ? parseInt(process.env.PORT) : 3002}`
        );
    });
}

main();
