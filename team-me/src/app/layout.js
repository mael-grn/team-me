import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navbar";

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: "Team Me",
  description: "Discover a new way to manage your team.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={rubik.className}>
        {children}
      </body>
    </html>
  );
}
