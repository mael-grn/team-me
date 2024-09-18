import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';
import StorageManager from './tools/storageManager';

export default function Home() {

  return (
    <div>
        <main>
            <p className={styles.appname}>Team Me</p>
            <div className={styles.heroDiv}>
                <div className={styles.heroLeft}>
                    <h1>DECOUVREZ UNE NOUVELLE MANIERE DE GERER VOS EQUIPES</h1>
                    <p>Etes-vous prêt pour embarquer dans une toute nouvelle manière de manager vos équipes sportives
                        ?</p>
                    <div className={styles.buttonsDiv}>
                        <Link href={"/register"} className={styles.startBtn}>Commencer</Link>
                        <Link href={"/login"} className={styles.loginBtn}>Connexion</Link>
                    </div>
                </div>
                <div className={styles.heroRight}>
                    <Image
                        src="/assets/running.jpg"
                        alt="Hero"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </main>
    </div>
  );
}
