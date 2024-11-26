"use client";

import {useState} from "react";
import styles from "@/app/components/infosSelectPopup.module.css";

export default function InfosSelectPopup({infosRequired, setInfosFctn, closeFctn}) {
    const [infos, setInfos] = useState([]);
    const [isClosing, setIsClosing] = useState(false);

    const validate = () => {
        if (infosRequired.length !== infos.length) {
            alert("Veuillez remplir tous les champs");
            return;
        }
        setIsClosing(true);

        setTimeout(() => {
            setInfosFctn(infos);
            closeFctn();
        }, 400);
    }
    return (
        <div className={styles.popup}>
            <div className={`${styles.background} ${isClosing ? styles.bgClosing : ''}`}></div>
            <div className={`${styles.popupContent} ${isClosing ? styles.popupContentClosing : ''}`}>
                <h2>Merci de saisir les informations :</h2>
                {
                    infosRequired.map((info, index) => {
                        return (
                            <div key={index}>
                                <input
                                    type={"text"}
                                    placeholder={info}
                                    onChange={(e) => {
                                        let newInfos = [...infos];
                                        newInfos[index] = e.target.value;
                                        setInfos(newInfos);
                                    }}
                                />
                            </div>
                        )
                    })
                }
                <div className={styles.btnList}>
                    <button onClick={() => {
                        setIsClosing(true)
                        setTimeout(() => {
                        closeFctn();
                        }, 400)}

                    }>Fermer</button>
                    <button onClick={validate}>Valider</button>
                </div>

            </div>
        </div>
    )
}