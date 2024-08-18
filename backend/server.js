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
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Servir el frontend de administración
app.use('/admin', express.static(path.join(__dirname, '../admin/build')));
app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin/build', 'index.html'));
});

// Test endpoint
app.get("/", (req, res) => {
    res.send("API Working");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
