const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectToDb');
const path = require('path');

// Import Route Files
const shareholderRoutes = require('./routes/shareholder');
const reportRoutes = require('./routes/Reports');

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve the 'uploads' folder so the frontend can view/download PDFs
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount Routes
app.use('/api/shareholders', shareholderRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));