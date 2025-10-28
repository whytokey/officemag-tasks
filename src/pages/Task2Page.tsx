import styles from './Task2Page.module.css';


const Task2Page = () => {
  return (
    <div className={styles.pageWrapper}>
      <header className={styles.mainHeader}>
        <h1>Заполните поля</h1>
        <span>ну пожалуйста</span>
      </header>

      <form className={styles.formContainer}>
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Основное</h2>
          <div className={styles.formRow}>
            <label htmlFor="fullName" className={styles.label}>Имя</label>
            <input type="text" id="fullName" className={styles.input} placeholder="по паспорту" />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="moodColor" className={styles.label}>Цвет вашего настроения</label>
            <input type="color" id="moodColor" className={styles.colorInput} defaultValue="#0d25e0" />
          </div>
        </section>

        <section className={`${styles.formSection} ${styles.yellowSection}`}>
          <h2 className={styles.sectionTitle}>Дополнительное</h2>
          <div className={styles.formRowTextarea}>
            <label htmlFor="comment" className={styles.label}>Комментарий</label>
            <textarea
              id="comment"
              className={styles.textarea}
              placeholder="Напишите хоть что-нибудь.&#10;Если хотите, конечно."
            ></textarea>
          </div>
        </section>
        <section className={styles.formSection}>

          <div className={`${styles.controlRow} ${styles.radioRow}`}>
            <label htmlFor="radioOption" className={styles.radioLabel}>
              <input type="radio" id="radioOption" name="someOption" className={styles.radio} />
              <span className={styles.radioText}>Ну а тут просто лежит радиобатон</span>
            </label>
          </div>

          <div className={styles.controlRow}>
            <label htmlFor="agreement" className={styles.checkboxLabel}>
              <input type="checkbox" id="agreement" className={styles.checkbox} defaultChecked />
              <span className={styles.checkboxText}>
                Соглашаюсь на всё, что бы вы не придумали и осознаю, что это может означать <a href="#" className={styles.link}>что угодно</a>
              </span>
            </label>
          </div>
        </section>

        <footer className={styles.formFooter}>
          <button type="submit" className={styles.submitButton}>Отправить все мои данные</button>
        </footer>
      </form>
    </div>
  );
};

export default Task2Page;

