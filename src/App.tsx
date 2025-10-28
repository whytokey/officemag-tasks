import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Task2Page from './pages/Task2Page';
import Task1Page from './pages/Task1Page';
import Task4Page from './pages/Task4Page';
import Task3Page from './pages/Task3Page';
import Task5Page from './pages/Task5Page';
import Task7Page from './pages/Task7Page';
import Task7_2Page from './pages/Task7_2Page';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="task-1" element={
        <main style={{ padding: '2rem' }}>
          <Task1Page />
        </main>
      } />
      <Route path="task-2" element={<Task2Page />} />
      <Route path="task-3" element={<Task3Page />} />
      <Route path="task-4" element={<Task4Page />} />
      <Route path="task-5" element={<Task5Page />} />
      <Route path="task-7" element={<Task7Page />} />
      <Route path="task-7_2" element={<Task7_2Page />} />
    </Routes>

  )
}

export default App;

