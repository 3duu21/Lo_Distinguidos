import path from 'path';
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Servir el frontend principal
app.use(express.static(path.join(process.cwd(), '../frontend/dist')));
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), '../frontend/dist', 'index.html'));
});

// Servir el frontend de administración
app.use('/admin', express.static(path.resolve('..admin/dist')));
app.get('/admin/*', (req, res) => {
    res.sendFile(path.resolve('..admin/dist', 'index.html'));
});

// Test endpoint
app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
