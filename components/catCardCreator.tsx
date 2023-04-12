import Image from 'next/image';
import styles from "@/styles/Creator.module.css";
import { useQuery } from "react-query";
import { CatImageData, UserData, CatCardCreatorProps, CatCardProps } from "@/types/global";
import blurImage from "../public/blur.png"

const CAT_API_URL = process.env.NEXT_PUBLIC_THECATAPI_RANDOM_IMAGE!;
const THECATAPI_KEY = process.env.NEXT_PUBLIC_THECATAPI_KEY!;
const DB_API_URI = process.env.NEXT_PUBLIC_DB_API_URI!;

const CatCardCreator = ({ user, updateUser }: CatCardCreatorProps) => {
  let catImage: CatImageData | undefined;

  const getCatImage = async ():Promise<Array<CatImageData>> => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("X-Auth-Token", THECATAPI_KEY);
    const res = fetch(encodeURI(CAT_API_URL), {
      method: "GET",
      headers: requestHeaders
    })
    return (await res).json();
  }

  const saveNewCat = async (catNickname: string):Promise<UserData> => {
    if (catNickname === "") throw new Error(`Please provide new cat's nickname`);

    const data: UserData = { ...user };

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("Content-Type", "application/json");


    const catData: CatCardProps = {
      nickname: catNickname,
      imageID: catImage!.id,
      imageURI: catImage!.url,
      width: catImage!.width,
      height: catImage!.height,
    }

    data.herd.unshift(catData);

    const res = fetch(encodeURI(`${DB_API_URI}/users/${data.id}`), {
      method: "PUT",
      headers: requestHeaders,
      body: JSON.stringify(data)
    })
    return (await res).json();
  }

  const handleSaveCat = async () => {
    const nicknameInput = document.getElementById("catNickname") as HTMLInputElement;
    const nickName = nicknameInput.value;
    const resp = saveNewCat(nickName);
    resp.then((rsp) => {
      updateUser(rsp);
      refetch();
      nicknameInput.value = "";
      alert(`Cat ${nickName} has been added to the herd!`);
    }).catch(err => {
      alert(err.message);
    });
  }

  const handleClick = () => {
    refetch();
  };

  const {data, error, isLoading, refetch} = useQuery('randomCatImage', getCatImage);

  if (data) {
    catImage = data[0];
  }

  return (
    <>
      { isLoading && <div>{"Loading Image..."}</div> }
      { error && error instanceof Error && <div> {`Cant load the image: ${error.message}`}</div> }
      { !isLoading && catImage &&
        <div className={styles.cardCreation}>
          <input id="catNickname" className={styles.nameInput} type="text" placeholder="Enter new cat's name"/>
          <Image  className={styles.card}
                  src={catImage.url}
                  alt="New Cat image"
                  placeholder="blur"
                  blurDataURL={blurImage.src}
                  width={200}
                  height={200}
          />
          <div className={styles.creatorButtons}>
            <button className={styles.saveButton} onClick={handleSaveCat}>{"Save cat"}</button>
            <button className={styles.refreshButton} onClick={handleClick}>{"Reload cat image"}</button>
          </div>
        </div>
      }
    </>
  )
};
export default CatCardCreator;
