"use client";

import {useEffect, useState} from "react";
import DataSide from "@/app/dashboard/dataSide";
import VisualSide from "@/app/dashboard/visualSide";
import styles from "./page.module.css";
import {useRouter} from "next/navigation";
import {recoverUserData} from "@/app/controller/userController";
import LordIcon from "@/app/components/lordIcon";
import {getAllEntity} from "@/app/utils/queryUtils";
import Popup from "@/app/components/popup";
import ClubSelect from "@/app/components/clubSelect";

export default function Page() {
    const router = useRouter();
    const [showData, setShowData] = useState(false);

    const [user, setUser] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupTitle, setPopupTitle] = useState("");


    const closePopup = () => {
        setShowPopup(false);
        setPopupMessage("");
        setPopupTitle("");
    }

    useEffect(() => {
        recoverUserData().then((data) => {
            setUser(data);
        });
    }, []);

    if (!user) {
        return (
            <main>
                <LordIcon iconName={"loader-black"} animationType={"loop"}/>
            </main>
        )
    }
    if (!user.club || !user.club === null) {
        return (
            <ClubSelect onDone={() => {
                recoverUserData().then((data) => {
                    setUser(data);
                });
            }}/>
        )
    }

    return (

        <main>
            {showPopup ? <Popup text={popupMessage} title={popupTitle} close={closePopup}/> : null}
            <div className={styles.container}>
                <div className={styles.pill}>
                    <span className={showData ? styles.left : styles.right}/>
                    <a onClick={() => setShowData(true)} className={showData ? styles.selected : ""}>Données</a>
                    <a onClick={() => setShowData(false)} className={!showData ? styles.selected : ""}>Visuel 3D</a>
                </div>
                <div className={styles.content}>
                    {showData ? <DataSide user={user}/> : <VisualSide/>}
                </div>
            </div>
        </main>
    )
}