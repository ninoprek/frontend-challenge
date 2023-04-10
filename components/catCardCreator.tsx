import Image from 'next/image';
import styles from "@/styles/Home.module.css";

const CatCardCreator = () => {
  return <Image className={styles.card} src="/catCreatorConcept.png" alt="CatCardCreator concept" width={200} height={200}/>;
};
export default CatCardCreator;
