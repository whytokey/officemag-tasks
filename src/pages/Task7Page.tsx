import { useEffect } from 'react';
import BeautifulButton from '../components/Button/BeautifulButton';
import styles from './Task7Pag.module.css';

const Task7Page = () => {
    useEffect(() => {
        document.body.classList.add('task7-active');
        return () => {
            document.body.classList.remove('task7-active');
        };
    }, []);

    return (
        <div className={styles.pageContainer}>
            <BeautifulButton />
        </div>
    );
}

export default Task7Page;