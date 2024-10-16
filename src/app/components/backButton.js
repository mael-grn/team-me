import LordIcon from "@/app/components/lordIcon";
import {useRouter} from "next/navigation";
import styles from "@/app/components/backButton.module.css";

export default function BackButton() {
    const router = useRouter();
    return (
        <div onClick={() => router.back()} className={styles.backButton}>
            <LordIcon iconName={"arrow-white"} animationType={"hover"}/>
        </div>
    )
}