import { useQuery } from "react-query";
import { CatCardProps, CardPanelProps, UserData } from "@/types/global";
import Image from 'next/image';
import styles from "@/styles/Home.module.css";

const DB_API_URI = process.env.NEXT_PUBLIC_DB_API_URI;

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

const CatCardPanel = ({ userID }: CardPanelProps) => {

  const endpoint = `${DB_API_URI}/users/${userID}`;

  const { isLoading, error, data } = useQuery(
    ["userData", userID],
    (): Promise<UserData> => fetch(endpoint).then(res => res.json())
  );

  return (
    <>
      { isLoading && <div>{`New herd coming in`}</div> }
      { error && error instanceof Error && <div> {`Where did the cats go?`} </div> }
      { data &&
        data.herd.map((cat) => (
          <CatCard {...cat} key={cat.imageID}/>
        ))
      }
    </>
  );
};
export default CatCardPanel;
