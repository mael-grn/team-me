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

    const demandClub = (clubName) => {
        setClubLoading(true)
        recoverUserData().then((us) => {
            insertEntity("club/demand", {name: clubName}).then((res) => {
                if (res.success) {
                    setPopupMessage("Votre demande d'adhésion au club à bien été envoyée ! Si vous aviez déjà fait une demande, celle-ci a été annulée.");
                    setPopupTitle("Demande envoyée !");
                    setShowPopup(true);
                    setClubLoading(false);
                } else {
                    setPopupMessage("Erreur lors de l'envoi de la demande");
                    setPopupTitle("Erreur");
                    setShowPopup(true);
                    setClubLoading(false);
                }
            })
        });
    }

    const addClub = (infos) => {
        setClubLoading(true);
        insertEntity("club", {name: infos[0], city: infos[1]}).then((data) => {
            if (data.success) {
                recoverUserData().then((us) => {
                    us.club = infos[0];
                    us.club_admin = 1;
                    updateUser(us).then(() => {
                        onDone();
                        setClubLoading(false);
                    });
                });
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
                                        <div className={styles.club} onClick={() => demandClub(club.name)}>
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