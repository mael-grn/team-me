import styles from './dataSide.module.css';
import CrudTable from "@/app/components/crudTable";
import {useEffect, useState} from "react";
import InfosSelectPopup from "@/app/components/infosSelectPopup";
import {approveDemand, getAllEntity, getUserFromClub, updateEntity} from "@/app/utils/queryUtils";
import {updateUser} from "@/app/controller/userController";
import PageLoading from "@/app/components/pageLoading";
import Popup from "@/app/components/popup";
import InfoTile from "@/app/components/infoTile";

export default function DataSide({user}) {
    const [loading, setLoading] = useState(false);
    const [showInfosPopup, setShowInfosPopup] = useState(false);
    const [infosPopupinfos, setInfosPopupInfos] = useState([]);
    const [infosPopupFctn, setInfosPopupFctn] = useState(null);
    const [clubUsers, setClubUsers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupTitle, setPopupTitle] = useState("");
    const [joinDemand, setJoinDemand] = useState([]);

    const closePopup = () => {
        setShowPopup(false);
        setPopupMessage("");
        setPopupTitle("");
    }

    useEffect(() => {
        getUserFromClub().then((users) => {
            if (!users.success) {
                setPopupMessage("Erreur lors de la récupération des utilisateurs du club");
                setPopupTitle("Erreur");
                setShowPopup(true);
                return;
            }
            setClubUsers(users.data ? users.data : []);
        });
        getAllEntity("club/demand").then((res) => {
            if (!res.success) {
                setPopupMessage("Erreur lors de la récupération des demandes d'adhésion");
                setPopupTitle("Erreur");
                setShowPopup(true);
                return;
            }
            setJoinDemand(res.data);
        });
    }, []);

    const approveJoinDemand = (user) => {
        approveDemand(user.id).then((res) => {
            if (!res.success) {
                setPopupMessage("Erreur lors de l'acceptation de la demande d'adhésion");
                setPopupTitle("Erreur");
                setShowPopup(true);
                return;
            }
            getAllEntity("club/demand").then((res) => {
                if (!res.success) {
                    setPopupMessage("Erreur lors de la récupération des demandes d'adhésion");
                    setPopupTitle("Erreur");
                    setShowPopup(true);
                    return;
                }
                setJoinDemand(res.data);
            });
        });
    }

    const quitClub = () => {
        setLoading(true);
        user.club = null
        user.club_admin = 0
        updateUser(user).then(() => {
            setLoading(false);
        });
    }

    return (
        loading ? <PageLoading/> :
        <main className={styles.dataSide}>
            {showInfosPopup ? <InfosSelectPopup infosRequired={infosPopupinfos} setInfosFctn={(i) => infosPopupFctn(i)} closeFctn={() => setShowInfosPopup(false)}/> : null}
            {showPopup ? <Popup title={popupTitle} text={popupMessage} close={closePopup}/> : null}

            <h1>Bienvenue sur le tableau de bord de {user.club}, {user.name} !</h1>
            {user.club_admin === 1 && <h2>Vous êtes administrateur du club</h2>}
            <button className={"button"} onClick={quitClub}>Quitter le club</button>
            <h3>Membres du club</h3>
            {
                clubUsers.map(user => {
                    return (
                        <p>- ({user.id}) {user.name} {user.surname}</p>
                    )
                })
            }
            {
                user.club_admin === 1 ? (
                    <div>
                        {
                            joinDemand.length > 1 ? (
                                <div>
                                    <h3>Vos demandes d'adhesion</h3>
                                    {
                                        joinDemand.map(user => {
                                            if (!user.id) {
                                                return null;
                                            }
                                            return (
                                                <div>
                                                    <p>- {user.name} {user.surname}</p>
                                                    <button onClick={() => approveJoinDemand(user)} className={"buttonLight"}>Accepter</button>
                                                </div>
                                            )

                                        })
                                    }
                                </div>
                            ) : <div>
                                <h3>Aucun utilisateur n'a demandé a rejoindre votre club pour le moment.</h3>
                            </div>
                        }

                        <div className={styles.crudSection}>
                            <CrudTable entityName={"staff"}/>
                            <CrudTable entityName={"group"}/>
                            <CrudTable entityName={"athlete"}/>
                        </div>
                    </div>

                ) : null
        }

        </main>
    )
}