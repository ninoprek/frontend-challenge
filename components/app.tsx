import { useState } from "react";
import { UserData } from "@/types/global";
import CatCardPanel from "../components/catCardPanel";
import CatCardCreator from "../components/catCardCreator";
import Footer from "../components/footer";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });

export default function App() {
  const [user, setUser] = useState<UserData | null>(null);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.description}>
          <h1 className={inter.className}>Cat Club 🐱</h1>
        </div>
          {
            user &&
            <div className={styles.content}>
              <div className={styles.column}>
                <CatCardCreator
                  user={ user }
                  updateUser={ (user: UserData):void => setUser(user) }
                />
              </div>
                <div className={`${styles.column} ${styles.herdColumn}`}>
                  <h2>{`${user.firstName}'s herd`}</h2>
                  <CatCardPanel user={ user } />
                </div>
            </div>
          }
        <div className={`${styles.row} ${styles.footer}`}>
          <Footer changeUser={ (user: UserData):void => setUser(user) }  />
        </div>
      </div>
    </>
  );
}
