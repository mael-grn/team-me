import Image from "next/image";
import styles from "./page.module.css";


export default function Page() {
    return (
            <main className={styles.main}>
                    <div className={styles.leftDiv}>
                        <h1>Connexion</h1>
                        <form>
                            <div className={styles.formInputDiv}>
                                <p htmlFor="email">Email</p>
                                <input type="email" id="email" name="email" required/>
                            </div>
                            <div className={styles.formInputDiv}>
                                <p htmlFor="password">Mot de passe</p>
                                <input type="password" id="password" name="password" required/>
                            </div>
                            <button>Connexion</button>
                        </form>
                    </div>
                    <Image
                        src="/assets/placeholder.svg"
                        alt="Hero"
                        width={500}
                        height={500}
                    />
            </main>
    );
}