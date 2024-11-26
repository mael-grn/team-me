import styles from "./crudTable.module.css"
import {useEffect, useState} from "react";
import {deleteEntity, getAllEntity, insertEntity, updateEntity} from "@/app/utils/queryUtils";
import LordIcon from "@/app/components/lordIcon";
import Popup from "@/app/components/popup";
import InfosSelectPopup from "@/app/components/infosSelectPopup";
import PageLoading from "@/app/components/pageLoading";

export default function CrudTable({entityName}) {
    const [entityLst, setEntityLst] = useState([]);
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newEntity, setNewEntity] = useState({});
    const [updatingEntity, setUpdatingEntity] = useState({});
    const [idOfUpdatingEntity, setIdOfUpdatingEntity] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupTitle, setPopupTitle] = useState("");
    const [showInfosPopup, setShowInfosPopup] = useState(false);
    const [infosPopupinfos, setInfosPopupInfos] = useState([]);
    const [infosPopupFctn, setInfosPopupFctn] = useState(null);

    useEffect(() => {
        load();
    }, []);

    const closePopup = () => {
        setShowPopup(false);
        setPopupMessage("");
        setPopupTitle("");
    }

    const load = () => {
        setLoading(true);
        getAllEntity(entityName).then((response) => {
            setLoading(false);
            if (response.success && response.data) {
                setEntityLst(response.data);
                setKeys(Object.keys(response.data[0]));
            }

        });
    }

    const update = (entity) => {
        setLoading(true);
        updateEntity(entityName, entity).then((response) => {
            setLoading(false);
            if (response.success) {
                load();
            }
        });
    }

    const insert = (entity) => {
        setLoading(true);
        insertEntity(entityName, entity).then((response) => {
            setLoading(false);
            if (response.success) {
                load();
            }
        });
    }

    const popupInfosInsert =(infos) => {
        if (!infos || infos.length === 0) return;
        let newEntity = {}
        keys.forEach((key, index) => {
            newEntity[key] = infos[index]
        })
        insert(newEntity)
    }

    const deleteE = (entity) => {
        setLoading(true);
        deleteEntity(entityName, entity).then((response) => {
            setLoading(false);
            if (response.success) {
                load();
            } else {
                if (response.data) {
                    setPopupMessage(response.errorType + response.data);
                    setPopupTitle("Erreur");
                    setShowPopup(true);
                } else {
                    setPopupMessage(response.errorType);
                    setPopupTitle("Erreur");
                    setShowPopup(true);
                }
            }
        });
    }

    return (

            <div className={styles.crud}>
                <h2>{entityName}</h2>

                {showInfosPopup ?
                    <InfosSelectPopup infosRequired={infosPopupinfos} setInfosFctn={(i) => popupInfosInsert(i)}
                                      closeFctn={() => setShowInfosPopup(false)}/> : null}
                {showPopup ? <Popup title={popupTitle} text={popupMessage} close={closePopup}/> : null}
                {loading ? <LordIcon iconName={"loader-black"} animationType={"loop"}/> : (
                    <div>
                    <table>
                        <thead>
                        <tr className={styles.titleTable}>
                            {keys.map((key) => (
                                <th key={key}>
                                    {key}
                                </th>
                            ))}
                            <th>
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {entityLst.map((entity, index) => (
                            Object.values(entity).every(value => value === null) ? null :
                                <tr key={index} className={styles.elemTable}>
                                    {keys.map((key) => (
                                        idOfUpdatingEntity === index && key !== "id" ?
                                            <td key={key}>
                                                <input
                                                    type={"text"}
                                                    id={key}
                                                    value={updatingEntity[key]}
                                                    onChange={
                                                        (e) => {
                                                            let newEntityCopy = {...updatingEntity};
                                                            newEntityCopy[key] = e.target.value;
                                                            setUpdatingEntity(newEntityCopy);
                                                        }
                                                    }
                                                />
                                            </td> :
                                            <td key={key}>
                                                {entity[key]}
                                            </td>
                                    ))}
                                    <td className={styles.actionBtns}>
                                        {
                                            idOfUpdatingEntity === index ?
                                                <button className={"buttonLight"} onClick={() => {
                                                    update(updatingEntity)
                                                    setIdOfUpdatingEntity(null);
                                                    setUpdatingEntity({});
                                                }}>Valider</button> : null
                                        }
                                        {
                                            idOfUpdatingEntity !== index ?
                                                <button className={"buttonLight"} onClick={() => {
                                                    setUpdatingEntity(entity);
                                                    setIdOfUpdatingEntity(index);
                                                }}>Modifier</button> : null
                                        }
                                        {
                                            idOfUpdatingEntity !== index ?
                                                <button className={"buttonLight"} onClick={() => deleteE(entity)}>Supprimer</button> : null
                                        }

                                    </td>
                                </tr>
                        ))}

                        </tbody>

                    </table>

                <button className={"button"} onClick={() => {
                    setInfosPopupInfos(keys)
                    setShowInfosPopup(true);
                }}>Ajouter
                </button>
                    </div>)}
            </div>


    );
}