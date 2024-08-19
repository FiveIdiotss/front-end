import React from 'react';
import styles from './Loading.module.css';

function Loading({ className, description }: { className?: string; description?: string }) {
    return (
        <div className={`flex w-full flex-col items-center justify-center ${className}`}>
            <div className={styles.main}>
                <div className={styles.droplet_spinner}>
                    <div className={styles.droplet}></div>
                    <div className={styles.droplet}></div>
                    <div className={styles.droplet}></div>
                </div>
            </div>
            {description && <span className="text-xs text-gray-400">{description}</span>}
        </div>
    );
}

export default Loading;
