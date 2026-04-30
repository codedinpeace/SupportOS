import app from './app.js';
import connectDB from './db/mongoDB.js';
import { config } from './config/config.js';

connectDB();

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});