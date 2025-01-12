import express from "express";
import cors from 'cors';
import { config } from "./config/config";
import { connectDB } from "./config/database"
import logger from "./utils/logger";
import authRoutes from "./routes/auth.routes";
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
const startServer = async (): Promise<void> => {
    try {
        await connectDB();
        app.listen(config.port, () => {
            logger.info(`Server is running on port ${config.port}`);
        });
    } catch (error) {
        logger.error(`Error starting server: ${error}`);
        process.exit(1);
    }
};

startServer();