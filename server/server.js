import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'Nothing here!' });
})

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from TMS API!' });
})

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log('Server listening at port:', port);
});