import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let tasksJSONString = "[]";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const dataFilePath = path.join(__dirname, 'data.json');

const getTasks = () => {
    // const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(tasksJSONString);
};

const saveTasks = (data) => {
    // const saveData =
    tasksJSONString = JSON.stringify(data);
    // fs.writeFileSync(dataFilePath, saveData);
};

app.get('/api/tasks', async (req, res) => {
    const data = getTasks();
    res.json(data);
});

app.post('/api/tasks', async (req, res) => {

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

app.put('/api/tasks/:id', async (req, res) => {
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

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const deleted = await Task.destroy({
          where: { id: req.params.id },
        });
        if (deleted) {
          res.status(204).send();
        } else {
          res.status(404).json({ message: 'Task not found' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

    // const taskId = req.params.id;
    // const tasks = getTasks();
    // const updatedTasks = tasks.filter(task => task.id != taskId);
    // if (tasks.length != updatedTasks.length) {
    //     saveTasks(updatedTasks);
    //     res.json({ status: 'success', message: 'Task deleted successfully' });
    // } else {
    //     res.status(404).json({ status: 'error', message: 'Task not found' });
    // }
});

app.listen(port, () => {
    console.log('Server listening at port:', port);
});