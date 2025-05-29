import express from 'express';
import articleRoutes from './routes/articleRoutes.js';
import journalistRoutes from './routes/journalistRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/articles', articleRoutes);
app.use('/journalists', journalistRoutes);
app.use('/categories', categoryRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});