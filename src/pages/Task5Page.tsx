import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Task5Page.module.css';

import sliderImage1 from '../assets/slider1IMG.png';
import sliderImage2 from '../assets/slider2IMG.png';
import sliderImage3 from '../assets/slider3IMG.png';
import sliderImage4 from '../assets/slider4IMG.png';
import ProductItem from '../components/ProductItem/ProductItem';

// Данные товаров
const products = [
    { id: 1, name: 'Набор настольный BESTAR «Amenhotep»', details: 'из дерева, 8 предметов, двойной лоток, светлая вишня', imageUrl: sliderImage1 },
    { id: 2, name: 'Набор настольный BESTAR «Charon»', details: 'из дерева, 7 предметов, двойной лоток, красное дерево', imageUrl: sliderImage2 },
    { id: 3, name: 'Набор настольный BESTAR «Charon»', details: 'из дерева, 7 предметов, двойной лоток, орех', imageUrl: sliderImage3 },
    { id: 4, name: 'Набор настольный BESTAR «Hercules»', details: 'из дерева, 5 предметов, двойной лоток, красное дерево', imageUrl: sliderImage4 },
    { id: 5, name: 'Набор настольный BESTAR «Hercules»', details: 'из дерева, 5 предметов, двойной лоток, красное деревл', imageUrl: sliderImage4 },
    { id: 6, name: 'Набор настольный BESTAR «Charon»', details: 'из дерева, 7 предметов, двойной лоток, орех', imageUrl: sliderImage3 },
    { id: 7, name: 'Набор настольный BESTAR «Charon»', details: 'из дерева, 7 предметов, двойной лоток, красное дерево', imageUrl: sliderImage2 }
];

const Task5Page = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const scrollThumbRef = useRef<HTMLDivElement>(null);
    const [thumbWidth, setThumbWidth] = useState(0);
    const [thumbLeft, setThumbLeft] = useState(0);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const startScrollLeft = useRef(0);
    const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, products.length);
    }, [products.length]);

    useEffect(() => {
        const observerOptions = {
            root: scrollContainerRef.current,
            rootMargin: '0px',
            threshold: 0.5
        };
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            setVisibleItems(prevVisible => {
                const newVisible = new Set(prevVisible);
                entries.forEach(entry => {
                    const itemId = Number(entry.target.getAttribute('data-id'));
                    if (entry.isIntersecting) {
                        newVisible.add(itemId);
                    } else {
                        newVisible.delete(itemId);
                    }
                });
                if (newVisible.size !== prevVisible.size || ![...newVisible].every(id => prevVisible.has(id))) {
                    return newVisible;
                }
                return prevVisible;
            });
        };
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const currentItemRefs = itemRefs.current;
        currentItemRefs.forEach(item => { if (item) observer.observe(item); });
        return () => { currentItemRefs.forEach(item => { if (item) observer.unobserve(item); }); };
    }, [products.length]);

    const updateThumb = useCallback(() => {
        const container = scrollContainerRef.current;
        const track = scrollTrackRef.current;
        if (container && track) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            const trackWidth = track.clientWidth;
            const proportionalThumbWidth = (clientWidth / scrollWidth) * trackWidth;
            const desiredThumbWidth = proportionalThumbWidth * 0.5331;
            const newThumbWidth = Math.max(
                desiredThumbWidth,
                20
            );
            setThumbWidth(newThumbWidth);
            const maxScrollLeft = scrollWidth - clientWidth;
            const maxThumbLeft = trackWidth - newThumbWidth;
            if (maxScrollLeft <= 0) {
                setThumbLeft(0);
                setThumbWidth(trackWidth);
                return;
            }
            const newThumbLeft = (scrollLeft / maxScrollLeft) * maxThumbLeft;
            setThumbLeft(newThumbLeft);
        }
    }, []);

    const handleScroll = useCallback(() => { if (!isDragging.current) updateThumb(); }, [updateThumb]);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        isDragging.current = true;
        startX.current = e.clientX;
        startScrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        scrollThumbRef.current?.classList.add(styles.dragging);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging.current || !scrollContainerRef.current || !scrollTrackRef.current || !scrollThumbRef.current) return;
        const container = scrollContainerRef.current;
        const track = scrollTrackRef.current;
        const { scrollWidth, clientWidth } = container;
        const trackWidth = track.clientWidth;
        const currentThumbWidth = scrollThumbRef.current.offsetWidth;
        const deltaX = e.clientX - startX.current;
        const scrollRatio = (scrollWidth - clientWidth) / (trackWidth - currentThumbWidth || 1);
        const newScrollLeft = Math.max(0, Math.min(startScrollLeft.current + deltaX * scrollRatio, scrollWidth - clientWidth));
        container.scrollLeft = newScrollLeft;
        updateThumb();
    }, [updateThumb]);

    const handleMouseUp = useCallback(() => {
        isDragging.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        scrollThumbRef.current?.classList.remove(styles.dragging);
    }, [handleMouseMove]);

    const handleWheelScroll = useCallback((e: WheelEvent) => {
        const container = scrollContainerRef.current;
        if (container) {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        }
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        updateThumb();
        container?.addEventListener('scroll', handleScroll);
        container?.addEventListener('wheel', handleWheelScroll, { passive: false });
        const resizeObserver = new ResizeObserver(() => { updateThumb(); });
        if (container) { resizeObserver.observe(container); }
        return () => {
            container?.removeEventListener('scroll', handleScroll);
            container?.removeEventListener('wheel', handleWheelScroll);
            if (container) { resizeObserver.unobserve(container); }
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleScroll, updateThumb, handleMouseMove, handleMouseUp, handleWheelScroll]);

    return (
        <div className={styles.pageContainer}>
            <div className={styles.showcaseWrapper}>
                <div className={styles.productsScrollContainer} ref={scrollContainerRef}>
                    {products.map((product, index) => (
                        <ProductItem
                            ref={el => { itemRefs.current[index] = el; }}
                            key={product.id}
                            {...product}
                            isVisible={visibleItems.has(product.id)}
                        />
                    ))}
                </div>

                <div className={styles.scrollbarTrack} ref={scrollTrackRef}>
                    <div
                        className={styles.scrollbarThumb}
                        ref={scrollThumbRef}
                        style={{
                            width: `${thumbWidth}px`,
                            left: `${thumbLeft}px`
                        }}
                        onMouseDown={handleMouseDown}
                    />
                </div>
            </div>
        </div>
    );
};

export default Task5Page;