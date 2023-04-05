import { CatCardProps } from "@/types/global";
import Image from 'next/image';

const CatCard: React.FC<CatCardProps> = ({
  nickname,
  imageURI,
  breed,
  breedId,
}) => {
  return (
    <div>
      <h2>{nickname}</h2>
      <Image src={imageURI} alt={`Picture of ${nickname}`} width={200} height={200} />
      {/*
      Monica said to comment these out for now. Maybe we'll use them later.
      <p>Breed: {breed}</p>
      <p>Breed ID: {breedId}</p> */}
    </div>
  );
};

const CatCardPanel = (props: { herd: CatCardProps[] }) => {
  return (
    <>
      {props.herd.map((cat) => (
        <CatCard {...cat} key={cat.imageID}/>
      ))}
    </>
  );
};
export default CatCardPanel;
