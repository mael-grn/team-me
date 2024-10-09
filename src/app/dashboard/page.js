"use client";

import {useState} from "react";
import DataSide from "@/app/dashboard/dataSide";
import VisualSide from "@/app/dashboard/visualSide";
import styles from "./page.module.css";

export default function Page() {

    const [showData, setShowData] = useState(false);

    return (

        <main>
            <div className={styles.container}>
                <div className={styles.pill}>
                    <span className={showData ? styles.left : styles.right}/>
                    <a onClick={() => setShowData(true)}>Données</a>
                    <a onClick={() => setShowData(false)}>Visuel 3D</a>
                </div>
                <div className={styles.content}>
                    {showData ? <DataSide/> : <VisualSide/>}
                </div>
            </div>
        </main>
    )
}