import styles from "./popup.module.css";
import {useEffect, useState} from "react";


export default function Popup({title, text, close}) {

    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            close();
        }, 400);
    };

    return (
        <div className={styles.popup}>
            <div className={`${styles.background} ${isClosing ? styles.bgClosing : ''}`}></div>
            <div className={`${styles.popupContent} ${isClosing ? styles.popupContentClosing : ''}`}>
                <h2>{title}</h2>
                <p>{text}</p>
                <button onClick={handleClose}>Fermer</button>

            </div>
        </div>
    )
}