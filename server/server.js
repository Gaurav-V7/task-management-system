import express from 'express';
import cors from 'cors';
import fs, { stat, write } from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { log } from 'console';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, 'data.json');

const getTasks = () => {
    const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(jsonData);
};

const saveTasks = (data) => {
    const saveData = JSON.stringify(data);
    fs.writeFileSync(dataFilePath, saveData);
};

app.get('/', (req, res) => {
    res.send({ message: 'Hello world!' });
});

app.get('/api/tasks', (req, res) => {
    const data = getTasks();
    res.json(data);
});

app.post('/api/tasks', (req, res) => {

    const existsTasks = getTasks();

    const taskData = req.body;

    taskData.id = (Math.round(Date.now() / 1000)).toString();

    if (taskData.title == null) {
        return res.status(401).send({ status: 'error', message: 'Task data missing' });
    }

    const findExist = existsTasks.find( task => task.id == taskData.id)
    if (findExist) {
        return res.status(409).send({ status: 'error', message: 'Task id must be unique' });
    }

    existsTasks.push(taskData);
    saveTasks(existsTasks);
    res.send({ status: 'success', message: 'Task added successfully' });
});

app.put('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    const tasks = getTasks();
    const index = tasks.findIndex(task => task.id == taskId);
    if (index != -1) {
        tasks[index] = updatedTask;
        saveTasks(tasks);
        res.json({ status: 'success', message: 'Task updated.' });
    } else {
        res.status(404).json({ status: 'error', message: 'Item not found' })
    }
});

app.delete('/api/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const tasks = getTasks();
    const updatedTasks = tasks.filter(task => task.id != taskId);
    if (tasks.length != updatedTasks.length) {
        saveTasks(updatedTasks);
        res.json({ status: 'success', message: 'Task deleted successfully' });
    } else {
        res.status(404).json({ status: 'error', message: 'Task not found' });
    }
});

app.listen(port, () => {
    console.log('Server listening at port:', port);
});