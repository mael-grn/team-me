import Image from "next/image";
import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <div>
        <main>
            <p className={styles.appname}>Team Me</p>
            <div className={styles.heroDiv}>
                <div className={styles.heroLeft}>
                    <h1>Découvrez une nouvelle manière de gérer vos équipes</h1>
                    <p>Etes-vous prêt pour embarquer dans une toute nouvelle manière de manager vos équipes sportives
                        ?</p>
                    <div className={styles.buttonsDiv}>
                        <Link href={"/login"} className={styles.startBtn}>Commencer</Link>
                        <Link href={"/login"} className={styles.loginBtn}>Connexion</Link>
                    </div>
                </div>
                <div>
                    <Image
                        src="/assets/placeholder.svg"
                        alt="Hero"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
            <div>
                <h2>Apprenez a gerer votre équipe sous une nouvelle dimmension</h2>
                <Image
                    src="/assets/placeholder.svg"
                    alt="Hero"
                    width={500}
                    height={500}
                />
            </div>
        </main>
    </div>
  );
}
