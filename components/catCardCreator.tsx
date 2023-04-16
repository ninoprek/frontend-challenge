import { useState } from "react";
import { useQuery } from "react-query";
import { CatImageData, UserData, CatCardCreatorProps, CatCardProps } from "@/types/global";
import Image from 'next/image';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from '@mui/icons-material/Save';
import styles from "@/styles/Creator.module.css";

const CAT_API_URL = process.env.NEXT_PUBLIC_THECATAPI_RANDOM_IMAGE!;
const CAT_API_ORIGIN = process.env.NEXT_PUBLIC_THECATAPI_ORIGIN!;
const THECATAPI_KEY = process.env.NEXT_PUBLIC_THECATAPI_KEY!;
const DB_API_URI = process.env.NEXT_PUBLIC_DB_API_URI!;

const CatCardCreator = ({ user, updateUser }: CatCardCreatorProps) => {
  let [success, setSuccess] = useState<boolean | null>(null);
  let [successMessage, setSuccessMessage] = useState<string | null>(null);
  let [fail, setFail] = useState<boolean | null>(null);
  let [failMessage, setFailMessage] = useState<string | null>(null);
  let catImage: CatImageData | undefined;

  const getCatImage = async ():Promise<Array<CatImageData>> => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set("X-Auth-Token", THECATAPI_KEY);
    requestHeaders.set("Origin", CAT_API_ORIGIN);
    const res = fetch(encodeURI(CAT_API_URL), {
      method: "GET",
      headers: requestHeaders
    })
    return (await res).json();
  }

  const saveNewCat = async (catNickname: string):Promise<UserData> => {
    if (catNickname === "") throw new Error(`Please provide new cat's nickname`);

    const data: UserData = { ...user };

    const catExsists = data.herd.find(cat => cat.nickname.toLowerCase() === catNickname.toLowerCase());
    if (catExsists) throw new Error(`Cat with the nickname <strong>${catNickname}</strong> already exsists`);

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

    const resp = fetch(encodeURI(`${DB_API_URI}/users/${data.id}`), {
      method: "PUT",
      headers: requestHeaders,
      body: JSON.stringify(data)
    })
    return (await resp).json();
  }

  const handleSaveCat = async () => {
    const nicknameInput = document.getElementById("catNickname") as HTMLInputElement;
    const nickName = nicknameInput.value;
    const resp = saveNewCat(nickName);
    resp.then((rsp) => {
      setSuccess(true);
      setSuccessMessage(`Cat <strong>${nickName}</strong> has been added to the herd!`)
      updateUser(rsp);
      refetch();
      nicknameInput.value = "";
      closeMessage(true);
    }).catch(err => {
      setFail(true);
      setFailMessage(err.message);
      nicknameInput.value = "";
      nicknameInput.focus();
      closeMessage(false);
    });
  }

  const handleClick = () => {
    refetch();
  };

  const closeMessage = (fromSuccess: boolean):void => {
    setTimeout(() => {
      if (fromSuccess) setSuccess(false);
      else setFail(false);
    }, 10000)
  }

  const {data, error, isLoading, refetch} = useQuery('randomCatImage', getCatImage);

  if (data) {
    catImage = data[0];
    console.log('cat img', catImage);

  }

  return (
    <>
      { isLoading && <div className={styles.cardCreationContent}>{"Loading Image..."}</div> }
      { error && error instanceof Error && <div className={styles.cardCreationContent}> {`Cant load the image: ${error.message}`}</div> }
      { !isLoading && catImage &&
        <div className={styles.cardCreationContent}>
          <div>
            <input id="catNickname" className={styles.nameInput} type="text" placeholder="Enter new cat's name"/>
            <div className={styles.creatorImage}>
              <Image
                fill
                className={`${styles.card} ${styles.imageShadow}`}
                src={catImage.url}
                alt="New Cat image"
                placeholder="blur"
                blurDataURL="/blur.png"
              />
            </div>
            <div className={styles.creatorButtons}>
              <IconButton
                className={styles.refreshButton}
                onClick={handleClick}
                color="primary"
                aria-label="upload picture"
                component="label"
              ><RefreshIcon
                fontSize="large"/>
              </IconButton>
              <IconButton
                className={styles.saveButton}
                onClick={handleSaveCat}
                color="primary"
                aria-label="upload picture"
                component="label"
              ><SaveIcon
                color="success"
                fontSize="large"/>
              </IconButton>
            </div>
          </div>
          <div>
            { success && successMessage &&
              <Alert  severity="success"
                      onClose={() => { setSuccess(false); }}
              >
                <AlertTitle>Meaw!! 😻</AlertTitle>
                <div dangerouslySetInnerHTML={{__html: successMessage}}></div>
              </Alert>
            }
            { fail && failMessage &&
              <Alert  severity="error"
                      onClose={() => { setFail(false); }}
              >
                <AlertTitle>Oh meaw!! 🙀</AlertTitle>
                <div dangerouslySetInnerHTML={{__html: failMessage}}></div>
              </Alert>
            }
          </div>
        </div>
      }
    </>
  )
};
export default CatCardCreator;
