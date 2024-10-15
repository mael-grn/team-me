import {recoverUserData, saveUserData, updateUser} from "@/app/controller/userController";
import {useEffect, useState} from "react";
import Popup from "@/app/components/popup";
import styles from "@/app/dashboard/settings/userSettings.module.css";
import LordIcon from "@/app/components/lordIcon";

export default function UserSettings() {

    const [modifyName, setModifyName] = useState(false);
    const [modifySurname, setModifySurname] = useState(false);
    const [modifyEmail, setModifyEmail] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const [user, setUser] = useState(null);

    useEffect(() => {
        recoverUserData().then(user => {
            if (user) {
                setUser(user);
                setName(user.name);
                setSurname(user.surname);
                setEmail(user.email);
            }
        });


    }, []);

    const modifyNameClick = async () => {
        if (!modifyName) {
            setModifyName(true);
        } else {
            if (name) {
                user.name = name;
                updateUser(user).then(async (res) => {
                    if (!res?.success) {
                        setTitle("Erreur");
                        setMessage("Une erreur est survenue lors de la modification de votre prénom.");
                    } else {
                        await saveUserData(user);
                    }
                });
                setModifyName(false);
            }
        }
    }

    const modifySurnameClick = async () => {
        if (!modifySurname) {
            setModifySurname(true);
        } else {
            if (surname) {
                user.surname = surname;
                updateUser(user).then(async (res) => {
                    if (!res?.success) {
                        setTitle("Erreur");
                        setMessage("Une erreur est survenue lors de la modification de votre nom.");
                    } else {
                        await saveUserData(user);
                    }
                });
                setModifySurname(false);
            }
        }
    }

    const modifyEmailClick = async () => {
        if (!modifyEmail) {
            setModifyEmail(true);
        } else {
            if (email) {
                user.email = email;
                updateUser(user).then(async (res) => {
                    if (!res?.success) {
                        setTitle("Erreur");
                        setMessage("Une erreur est survenue lors de la modification de votre email.");
                    } else {
                        await saveUserData(user);
                    }
                });
                setModifyEmail(false);
            }
        }
    }

    return (
        <div>
            {message && message !== "" && <Popup title={title} text={message} close={() => {
                setMessage(null);
                setTitle(null)
            }}/>}
            <h1>Paramètres du profile</h1>
            <div>
                <div className={styles.settingsElem}>
                    <p>Prénom</p>
                    <input readonly={modifyName ? undefined : "true"} value={name}
                           onChange={(e) => setName(e.target.value)}
                           className={modifyName ? styles.modif : undefined}/>
                    <a onClick={modifyNameClick}>
                        <LordIcon iconName={modifyName ? "check" : "setting"}
                                  animationType={"hover"}/>
                    </a>
                </div>
                <div className={styles.settingsElem}>
                    <p>Nom</p>
                    <input readonly={modifySurname ? undefined : "true"} value={surname}
                           onChange={(e) => setSurname(e.target.value)}
                           className={modifySurname ? styles.modif : undefined}/>
                    <a onClick={modifySurnameClick}>
                        <LordIcon iconName={modifySurname ? "check" : "setting"}
                                  animationType={"hover"}/>

                    </a>
                </div>
                <div className={styles.settingsElem}>
                    <p>Email</p>
                    <input readonly={modifyEmail ? undefined : "true"} value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className={modifyEmail ? styles.modif : undefined}/>
                    <a onClick={modifyEmailClick}>
                        <LordIcon iconName={modifyEmail ? "check" : "setting"}
                                  animationType={"hover"}/>

                    </a>
                </div>
            </div>

        </div>
    )
}