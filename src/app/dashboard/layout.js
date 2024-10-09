import Navbar from "@/app/components/navbar";
import LenisScroll from "@/app/components/lenis";
import {Rubik} from "next/font/google";
const rubik = Rubik({ subsets: ['latin'] })

export default function Layout({ children }) {
    return (
        <html lang="fr">
        <body className={rubik.className}>
        <LenisScroll/>
        <Navbar/>
        {children}
        </body>
        </html>
    );
}
