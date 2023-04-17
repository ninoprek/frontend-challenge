import { CatCardProps, CardPanelProps } from "@/types/global";
import Image from 'next/image';
import styles from "@/styles/Card.module.css";

const CatCard = ({
  nickname,
  imageURI,
  breed,
  breedId,
}: CatCardProps) => {

  const colors: string[] = [
    "red",
    "purple",
    "fuchsia",
    "lime",
    "yellow",
    "aqua",
    "blue",
    "aquamarine",
    "coral"
  ]

  const style:React.CSSProperties = {
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  };

  return (
    <div className={`${styles.cardContent} ${styles.imageShadow}`}>
      <h3
        id="nickname"
        className={styles.catNickname}
        style={style}
        >{nickname}
      </h3>
      <div className={styles.card}>
        <Image
          fill
          style={{objectFit:"cover"}}
          className={`${styles.herdImage}`}
          src={imageURI}
          alt={`Picture of ${nickname}`}
          placeholder="blur"
          blurDataURL="/blur.png"
        />
      </div>
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
