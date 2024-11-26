import styles from './dataSide.module.css';
import CrudTable from "@/app/components/crudTable";
import {useState} from "react";
import InfosSelectPopup from "@/app/components/infosSelectPopup";
import {updateEntity} from "@/app/utils/queryUtils";
import {updateUser} from "@/app/controller/userController";
import PageLoading from "@/app/components/pageLoading";

export default function DataSide({user}) {
    const [loading, setLoading] = useState(false);
    const [showInfosPopup, setShowInfosPopup] = useState(false);
    const [infosPopupinfos, setInfosPopupInfos] = useState([]);
    const [infosPopupFctn, setInfosPopupFctn] = useState(null);

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

            <h1>Bienvenue sur le tableau de bord de {user.club}, {user.name}</h1>
            <button className={"button"} onClick={quitClub}>Quitter le club</button>
            {
                user.club_admin === 1 ? (
                    <div>
                        <p>Vous êtes adimistrateur du club.</p>
                        <CrudTable entityName={"staff"}/>
                    </div>
                ) : null
            }

        </main>
    )
}