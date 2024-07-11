import express from 'express';
<<<<<<< HEAD
import cors from 'cors';
=======
>>>>>>> 58297a5fd225127cdd8a452740ae364647285184

const app = express();
const port = 3000;

<<<<<<< HEAD
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'Nothing here!' });
})

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from TMS API!' });
})

=======
app.get('/', (req, res) => {
    res.send('Hello World');
});
>>>>>>> 58297a5fd225127cdd8a452740ae364647285184

app.listen(port, () => {
    console.log('Server listening at port:', port);
});