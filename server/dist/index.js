"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const db_1 = __importDefault(require("./db"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const targetAudience_routes_1 = __importDefault(require("./routes/targetAudience.routes"));
const website_routes_1 = __importDefault(require("./routes/website.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const main = async () => {
    await (0, db_1.default)();
    const app = (0, express_1.default)();
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({ credentials: true, origin: "*" }));
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use((0, multer_1.default)().any());
    app.use(express_1.default.static("public"));
    app.use("/targetAudience", targetAudience_routes_1.default);
    app.use('/auth', auth_routes_1.default);
    app.use("/website", website_routes_1.default);
    app.get("/", (_req, res) => {
        res.send("404 Page not found Test");
    });
    app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3002, () => {
        console.log(`Listen on port ${process.env.PORT ? parseInt(process.env.PORT) : 3002}`);
    });
};
main();
//# sourceMappingURL=index.js.map