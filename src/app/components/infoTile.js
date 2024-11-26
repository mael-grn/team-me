'use client';

import {useState} from "react";
import styles from "./infoTile.module.css";
export default function ({title, content}) {
    const [showContent, setShowContent] = useState(false);
    return (
        <div className={`${styles.infoTile} ${showContent ? styles.deploy : null}`} onClick={() => setShowContent(!showContent)}>
             <h3>{title}</h3>
            <p className={styles.content}>{content}</p>
        </div>
    )
}