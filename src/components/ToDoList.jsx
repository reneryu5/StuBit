/* eslint-disable no-unused-vars */
import './ToDoList.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [completedCount, setCompletedCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const count = tasks.filter(task => task.completed).length;
    setCompletedCount(count);

    const time = tasks.reduce((acc, task) => {
      if (task.completed && task.endTime && task.startTime) {
        return acc + (new Date(task.endTime) - new Date(task.startTime));
      }
      return acc;
    }, 0);
    setTotalTime(time);
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false, startTime: null, endTime: null }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = index => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        const now = new Date();
        return {
          ...task,
          completed: !task.completed,
          endTime: task.completed ? null : now,
          startTime: task.startTime || now,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const removeTask = index => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const calculatePerformance = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const data = {
    labels: ['Performance'],
    datasets: [
      {
        label: 'Performance (%)',
        data: [calculatePerformance()],
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="todo-container">
      <div className="wrapper">
        <div className="left-section">
          <div className="todo-list">
            <h1>Set a Goal</h1>
            <div className="task-input">
              <FontAwesomeIcon icon={faRedoAlt} className="reset-icon" onClick={clearTasks} />
              <input
                type="text"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                placeholder="Add a new task..."
              />
              <button onClick={addTask}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <ul>
              {tasks.map((task, index) => (
                <li key={index} className={task.completed ? 'completed' : ''}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(index)}
                  />
                  <span onClick={() => toggleTaskCompletion(index)}>{task.text}</span>
                  <button onClick={() => removeTask(index)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right-section">
          <p> &nbsp; </p>
          <h2>Performance Graph</h2>
          <Bar data={data} />
          <p>Total Time Taken: {formatTime(totalTime)}</p>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
