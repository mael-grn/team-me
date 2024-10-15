"use client";

import {useState} from "react";
import UserSettings from "@/app/dashboard/settings/userSettings";
import AppSettings from "@/app/dashboard/settings/appSettings";
import DisplaySettings from "@/app/dashboard/settings/DisplaySettings";
import styles from "@/app/dashboard/settings/page.module.css";

export default function Page() {

    const [showProfileSettings, setShowProfileSettings] = useState(true);
    const [showApplicationSettings, setShowApplicationSettings] = useState(false);
    const [showAffichageSettings, setShowAffichageSettings] = useState(false);

    const toogleSettings = (newSettings) => {
        switch (newSettings) {
            case "profile":
                setShowProfileSettings(true);
                setShowApplicationSettings(false);
                setShowAffichageSettings(false);
                break;
            case "application":
                setShowProfileSettings(false);
                setShowApplicationSettings(true);
                setShowAffichageSettings(false);
                break;
            case "affichage":
                setShowProfileSettings(false);
                setShowApplicationSettings(false);
                setShowAffichageSettings(true);
                break;
        }
    }
    return (
        <div className={styles.settings}>
            <h1>Paramètres</h1>
            <div className={styles.sideInfo}>
                <a className={showProfileSettings ? "button" : "buttonLight"} onClick={() => toogleSettings("profile")}>Profile</a>
                <a className={showApplicationSettings ? "button" : "buttonLight"} onClick={() => toogleSettings("application")}>Application</a>
                <a className={showAffichageSettings ? "button" : "buttonLight"} onClick={() => toogleSettings("affichage")}>Affichage</a>
            </div>
            <div className={styles.settingsContent}>
                {showProfileSettings ? <UserSettings/> : ""}
                {showApplicationSettings ? <AppSettings/> : ""}
                {showAffichageSettings ? <DisplaySettings/> : ""}
            </div>
        </div>
    )
}