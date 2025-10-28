import type { ButtonVariant } from '../components/Button/Button';
import Button from '../components/Button/Button';
import styles from './Task3Page.module.css';


const IconTriangle = () => (
  <svg viewBox="0 0 4 8" style={{ width: '4px', height: '8px' }}> 
    <path d="M0 0 L4 4 L0 8 Z" /> 
  </svg>
);

const IconEdit = () => (
  <svg viewBox="0 0 24 24"><path fillRule="evenodd" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
);

const IconExcel = () => (
  <svg viewBox="0 0 24 24"><path fillRule="evenodd" d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" /></svg>
);
const IconDelete = () => (
  <svg viewBox="0 0 24 24">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);
const IconPrint = () => (
  <svg viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" /></svg>
);
const IconUpload = () => (
  <svg viewBox="0 0 24 24">
    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
  </svg>
);

const buttonVariants: ButtonVariant[] = [
  'base',
  'red-outline',
  'red',
  'base-triangle',
  'green',
  'green-outline',
];

const Task3Page = () => {
  return (
    <div className={styles.pageBackground}>
      
      <div className={styles.pageContainer}>

        <div className={styles.gridContainer}>
          
          <div className={styles.buttonRow}>
            {buttonVariants.map((variant) => (
              <Button
                key={variant}
                variant={variant}
                rightIcon={variant === 'base-triangle' ? <IconTriangle /> : undefined}
              >
                Просмотреть
              </Button>
            ))}
          </div>

          <div className={styles.buttonRow}>
            {buttonVariants.map((variant) => (
              <Button
                key={variant}
                variant={variant}
                isHovered={true}
                rightIcon={variant === 'base-triangle' ? <IconTriangle /> : undefined}
              >
                Просмотреть
              </Button>
            ))}
          </div>

          <div className={styles.buttonRow}>
            {buttonVariants.map((variant) => (
              <Button
                key={variant}
                variant={variant}
                isActive={true}
                rightIcon={variant === 'base-triangle' ? <IconTriangle /> : undefined}
              >
                Просмотреть
              </Button>
            ))}
          </div>

          <div className={styles.buttonRow}>
            {buttonVariants.map((variant) => (
              <Button
                key={variant}
                variant={variant}
                disabled={true}
                rightIcon={variant === 'base-triangle' ? <IconTriangle /> : undefined}
              >
                Просмотреть
              </Button>
            ))}
          </div>

        </div>

        <div className={styles.iconButtonRow}>
          <Button variant="icon-gray" leftIcon={<IconEdit />}>
            Редактировать
          </Button>
          <Button variant="icon-gray" leftIcon={<IconExcel />}>
            Выгрузить в Excel
          </Button>
          <Button variant="icon-gray" leftIcon={<IconDelete />}>
            Удалить список
          </Button>
          <Button variant="icon-gray" leftIcon={<IconPrint />}>
            Распечатать
          </Button>
          <Button variant="icon-gray" leftIcon={<IconUpload />}>
            Загрузить из файла
          </Button>
        </div>
        
      </div>
    </div>
  );
};

export default Task3Page;