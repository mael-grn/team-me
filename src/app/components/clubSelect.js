"use client";

import styles from "./clubSelect.module.css"

import {useEffect, useState} from "react";
import {getAllEntity, insertEntity} from "@/app/utils/queryUtils";
import LordIcon from "@/app/components/lordIcon";
import Popup from "@/app/components/popup";
import InfosSelectPopup from "@/app/components/infosSelectPopup";
import {recoverUserData, updateUser} from "@/app/controller/userController";
import PageLoading from "@/app/components/pageLoading";

export default function ClubSelect({onDone}) {
    const [clubLoading, setClubLoading] = useState(true);
    const [clubs, setClubs] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showInfosPopup, setShowInfosPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupTitle, setPopupTitle] = useState("");

    const closePopup = () => {
        setShowPopup(false);
        setPopupMessage("");
        setPopupTitle("");
    }

    useEffect(() => {
        setClubLoading(true);
        getAllEntity("club").then((data) => {
            setClubs(data.data);
            setClubLoading(false);
        });
    }, []);

    const choseClub = (clubName) => {
        setClubLoading(true)
        recoverUserData().then((us) => {
            us.club = clubName;
            us.club_admin = 1;

            updateUser(us).then(() => {
                onDone();
                setClubLoading(false);
            });
        });
    }

    const addClub = (infos) => {
        setClubLoading(true);
        insertEntity("club", {name: infos[0], city: infos[1]}).then((data) => {
            if (data.success) {
                choseClub(infos[0])
            } else {
                setClubLoading(false)
                setPopupMessage("Erreur lors de la création du club");
                setPopupTitle("Erreur");
                setShowPopup(true);
            }
        });
    }

    return (
        <main className={styles.clubSelect}>

            {
                clubLoading ? <PageLoading/> :
                    <div className={styles.content}>
                        {showInfosPopup ? <InfosSelectPopup infosRequired={["Nom", "Ville"]} setInfosFctn={(i) => addClub(i)} closeFctn={() => setShowInfosPopup(false)}/> : null}
                        {showPopup ? <Popup text={popupMessage} title={popupTitle} close={closePopup}/> : null}
                        <h1>Commencez par rejoindre un club, ou en creer un !</h1>
                        <div className={styles.clubLst}>
                            {
                                clubs.map((club, index) => {
                                    return (
                                        <div className={styles.club} onClick={() => choseClub(club.name)}>
                                            <h2>{club.name}</h2>
                                            <p>{club.city}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <button className={styles.addBtn} onClick={() => setShowInfosPopup(true)}>Créer un club</button>
                    </div>
            }
        </main>

    )
}