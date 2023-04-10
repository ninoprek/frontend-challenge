import { useState } from "react";
import CatCardPanel from "../components/catCardPanel";
import CatCardCreator from "../components/catCardCreator";
import DemoFooter from "../components/demoFooter";
import Footer from "../components/footer";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });

export default function App() {
  const [userID, setUserID] = useState<number | null>(null);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.description}>
          <h1 className={inter.className}>Cat Club 🐱</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.column}>
            <CatCardCreator />
          </div>
          { userID &&
            <div className={`${styles.column} ${styles.herd}`}>
              <CatCardPanel userID={ userID } />
            </div>
          }
        </div>
        <div className={`${styles.row} ${styles.footer}`}>
          {/* <DemoFooter /> */}
          <Footer changeUser={ (id: number):void => setUserID(id) }  />
        </div>
      </div>
    </>
  );
}
