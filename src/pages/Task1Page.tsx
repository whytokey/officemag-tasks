import styles from './Task1Page.module.css'

const Task1Page = () => {
    return (
        <article className={styles.textContainer}>
            <h1 className={styles.title}>Основы веб-разработки</h1>
            <p className={styles.paragraph}>
                Веб-разработка — это процесс создания веб-сайтов или веб-приложений. Она включает в себя всё от простой одностраничной страницы с текстом до сложных веб-сервисов, социальных сетей или электронных коммерческих площадок. Основные технологии, используемые в веб-разработке, это <strong className={styles.strong}>HTML, CSS и JavaScript</strong>.
            </p>

            <h2 className={styles.subtitle}>Ключевые технологии</h2>
            <p className={styles.paragraph}>
                Давайте рассмотрим их подробнее. <em>Каждая технология выполняет свою уникальную роль.</em>
            </p>

            <ul className={styles.list}>
                <li><strong>HTML (HyperText Markup Language)</strong> — это стандартный язык разметки для создания веб-страниц. Он определяет структуру вашей страницы.</li>
                <li><strong>CSS (Cascading Style Sheets)</strong> — используется для описания внешнего вида страницы.</li>
                <li><strong>JavaScript</strong> — это язык программирования, который делает сайты "живыми".</li>
            </ul>

            <blockquote className={styles.blockquote}>
                "Веб-разработка — это сочетание творчества и технической экспертизы, где каждая строка кода может создать новый мир"
                <cite>— Крис Койер</cite>
            </blockquote>

            <p className={styles.paragraph}>
                Пример кода на JavaScript для вывода сообщения в консоль:
            </p>
            <pre className={styles.codeBlock}>
                <code>
                    {`function greet(name) {\n  console.log('Привет, ' + name + '!');\n}\n\ngreet('Мир');`}
                </code>
            </pre>

            <p className={styles.paragraph}>
                Для более подробной информации вы можете посетить <a href="https://developer.mozilla.org/ru/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" className={styles.link}>MDN Web Docs</a>.
            </p>
        </article>
    );
};

export default Task1Page;