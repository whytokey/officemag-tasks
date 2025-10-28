import styles from './BeautifulButton.module.css';

const BeautifulButton = () => {
    return (
        <button className={styles.beautifulButton}>
            <span className={styles.buttonContent}>Кнопка</span>
        </button>
    );
}

export default BeautifulButton;