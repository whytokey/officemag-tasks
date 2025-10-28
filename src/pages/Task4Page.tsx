import { useEffect } from 'react';
import { Diagram } from '../components/Diagram/Diagram';

const Task4Page = () => {
  useEffect(() => {
    document.body.classList.add('task4-active');
    return () => {
      document.body.classList.remove('task4-active');
    };
  }, []);

  return (
    <div>
      <Diagram />
    </div>
  );
};

export default Task4Page;

