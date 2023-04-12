import { CatCardProps, CardPanelProps } from "@/types/global";
import Image from 'next/image';
import styles from "@/styles/Home.module.css";

const CatCard = ({
  nickname,
  imageURI,
  breed,
  breedId,
}: CatCardProps) => {
  return (
    <div className={styles.card}>
      <h2>{nickname}</h2>
      <Image src={imageURI} alt={`Picture of ${nickname}`} width={200} height={200} />
      {/*
      Monica said to comment these out for now. Maybe we'll use them later.
      <p>Breed: {breed}</p>
      <p>Breed ID: {breedId}</p> */}
    </div>
  );
};

const CatCardPanel = ({ user }: CardPanelProps) => {
  return (
    <div className={styles.herd}>
      {
        user.herd.map((cat) => (
          <CatCard {...cat} key={cat.imageID}/>
        ))
      }
    </div>
  );
};
export default CatCardPanel;
