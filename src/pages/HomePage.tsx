import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Тестовые задания</h1>
      <p className={styles.subtitle}>Выберите задание для просмотра:</p>
      <ul className={styles.list}>
        <li>
          <Link to="/task-1" className={styles.taskLink}>Задание 1: "Текст"</Link>
        </li>
        <li>
          <Link to="/task-2" className={styles.taskLink}>Задание 2: "Форма"</Link>
        </li>
        <li>
          <Link to="/task-3" className={styles.taskLink}>Задание 3: "Кнопки"</Link>
        </li>
        <li>
          <Link to="/task-4" className={styles.taskLink}>Задание 4: "Схема"</Link>
        </li>
        <li>
          <Link to="/task-5" className={styles.taskLink}>Задание 5: "Слайдер"</Link>
        </li>
        <li>
          <a
            href="https://github.com/whytokey/officemag-task6"
            className={styles.taskLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Задание 6: "Загадка черной страницы"
          </a>
        </li>
        <li>
          <Link to="/task-7" className={styles.taskLink}>Задание 7: "Красота"</Link>
        </li>
        <li>
          <Link to="/task-7_2" className={styles.taskLink}>Задание 7 Часть 2: "Переключатель"</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
