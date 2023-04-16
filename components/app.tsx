import { useState } from "react";
import { UserData } from "@/types/global";
import CatCardPanel from "../components/catCardPanel";
import CatCardCreator from "../components/catCardCreator";
import Footer from "../components/footer";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Image from 'next/image';
const inter = Inter({ subsets: ["latin"] });

export default function App() {
  const [user, setUser] = useState<UserData | null>(null);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.description}>
          <Image
            src="/snapon.svg"
            alt="Snap-op"
            width={100}
            height={40}
          />
          <h1 className={inter.className} style={{margin: "auto"}}>Cat Club 🐱</h1>
        </div>
          {
            user &&
            <div className={styles.content}>
              <div className={`${styles.column} ${styles.createColumn}`}>
                <div className={styles.createTitle}>
                  <h2>Add a new cat</h2>
                </div>
                <CatCardCreator
                  user={ user }
                  updateUser={ (user: UserData):void => setUser(user) }
                />
              </div>
              <div className={`${styles.column} ${styles.herdColumn}`}>
                <div className={styles.herdOwner}>
                  <h2>{`${user.firstName}'s herd`}</h2>
                </div>
                <CatCardPanel user={ user } />
              </div>
            </div>
          }
        <div className={`${styles.footer}`}>
          <Footer changeUser={ (user: UserData):void => setUser(user) }  />
        </div>
      </div>
    </>
  );
}
