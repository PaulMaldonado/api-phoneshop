import app from './app';
import mongoose from './database/db';

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port: ${port}`));