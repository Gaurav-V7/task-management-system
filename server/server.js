import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let tasksArr = [];

const getTasks = () => {
    const mainData = tasksArr
        .map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            completed: item.completed
        }));
    
    return mainData;
};

const saveTasks = (data) => {
    tasksArr = data;
};

app.get('/api/tasks', (req, res) => {
    const data = getTasks();
    res.json(data);
});

app.post('/api/tasks', (req, res) => {

    const existsTasks = getTasks();

    const taskData = req.body;

    taskData.id = (Math.round(Date.now() / 1000)).toString();
    
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