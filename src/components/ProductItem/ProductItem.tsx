import { forwardRef } from 'react';
import styles from './ProductItem.module.css';
interface ProductItemProps {
    id: number;
    name: string;
    details: string;
    imageUrl: string;
    isVisible: boolean;
}

const ProductItem = forwardRef<HTMLDivElement, ProductItemProps>(
    ({ id, name, details, imageUrl, isVisible }, ref) => (
        <div
            ref={ref} 
            className={`${styles.productItem} ${isVisible ? '' : styles.partiallyHidden}`}
            data-id={id}
        >
            <img src={imageUrl} alt={name} className={styles.productImage} />
            <div className={styles.productInfo}>
                <p className={styles.productText}>
                    {name} {details}
                </p>
            </div>
        </div>
    )
);

ProductItem.displayName = 'ProductItem';

export default ProductItem;
