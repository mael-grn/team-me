"use client";

import {useEffect, useState} from "react";
import DataSide from "@/app/dashboard/dataSide";
import VisualSide from "@/app/dashboard/visualSide";
import styles from "./page.module.css";
import {useRouter} from "next/navigation";
import {recoverUserData} from "@/app/controller/userController";

export default function Page() {
    const router = useRouter();
    const [showData, setShowData] = useState(false);

    useEffect(() => {
        recoverUserData().then((res) => {
            if (!res) router.push("/");
        });
    }, []);

    return (

        <main>
            <div className={styles.container}>
                <div className={styles.pill}>
                    <span className={showData ? styles.left : styles.right}/>
                    <a onClick={() => setShowData(true)} className={showData ? styles.selected : ""}>Données</a>
                    <a onClick={() => setShowData(false)} className={!showData ? styles.selected : ""}>Visuel 3D</a>
                </div>
                <div className={styles.content}>
                    {showData ? <DataSide/> : <VisualSide/>}
                </div>
            </div>
        </main>
    )
}