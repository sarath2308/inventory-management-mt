import express from "express";
import "module-alias/register";
import cookieParser from "cookie-parser";
import { urlencoded } from "express";
import cors from "cors";
import { connectDB } from "./config/db.connect";
import { errorHandler } from "./middleware/error.handler";
import { EntryRoutes } from "./routes/entry.routes";
import { loadConfigFromSSM } from "./config/ssm";

const app = express();


async function startServer() {
    await loadConfigFromSSM();
    await connectDB();

    app.use(cookieParser());
    app.use(urlencoded({ extended: true }));
    app.use(express.json());

    app.use(
        cors({
            origin: process.env.FRONTEND_URL,
            credentials: true,
        }),
    );

    app.use("/api", EntryRoutes());
    const PORT: number = Number(process.env.PORT) || 5000;
    app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));

    app.use(errorHandler);
}

startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});
