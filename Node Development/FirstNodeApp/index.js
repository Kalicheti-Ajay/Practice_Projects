import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/schooldb' || 'mongodb+srv://shaik_raiyan:hello143@payments.vrlsa0p.mongodb.net/';




app.use(express.json());






app.get('/', (req, res) => {
    res.send('Serever is running! Now open http://localhost:5000/students');
});

async function start() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        await seedIfEmpty();

        app.listen(PORT, () => {
            console.log('Server started');
            console.log('Open this link: http://localhost:' + PORT + '/students');
        });
    } catch (error) {
        console.error(' could not connect to MongoDB');
        console.error('    Is MongoDB running? Is MONGO_URI correct?');
        console.error('    ', error.message);
        process.exit(1);
    }
}

start();