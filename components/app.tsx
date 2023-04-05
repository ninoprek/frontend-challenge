// import { useQuery } from "react-query";
import CatCardPanel from "../components/catCardPanel";
import CatCardCreator from "../components/catCardCreator";
import DemoFooter from "../components/demoFooter";
import useGetData from "../utils/useGetData";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });

// Mock userID for testing.
const userID = 42;
const getType = "users";
export default function App() {
  const { isLoading, error, data } = useGetData(userID, getType);
  console.log('data: ', data);

  return (
    <>
      { isLoading &&  <div>{`"Loading..."`}</div> }
      { error && error instanceof Error && <div>{ `An error has occurred: ${error.message}` }</div> }
      { !isLoading && !error && data &&
        <div className={styles.main}>
          <div className={styles.row}>
            <div className={styles.description}>
              <h1 className={inter.className}>Cat Club 🐱</h1>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <CatCardCreator />
            </div>
            <div className={styles.col}>
              <CatCardPanel herd={data.herd} />
            </div>
          </div>
          <div className={styles.row}>
            <DemoFooter />
          </div>
        </div>
      }
    </>
  );
}
