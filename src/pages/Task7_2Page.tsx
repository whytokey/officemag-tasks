import { useEffect } from 'react';
import styles from './Task7_2Page.module.css';
import ToggleSwitch from '../components/ToggleSwitch/ToggleSwitch';

const Task7_2Page = () => {
  useEffect(() => {
    document.body.classList.add('task7_2-active');
    return () => {
      document.body.classList.remove('task7_2-active');
    };
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <ToggleSwitch />
      </header>
    </div>
  );
};

export default Task7_2Page;