import React from 'react';
import styles from './Loading.module.css';

function Loading() {
    return (
        <div className={styles.main}>
            <div className={styles.droplet_spinner}>
                <div className={styles.droplet}></div>
                <div className={styles.droplet}></div>
                <div className={styles.droplet}></div>
            </div>
        </div>
    );
}

export default Loading;
