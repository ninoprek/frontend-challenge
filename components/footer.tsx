import { useQuery } from "react-query";
import { UserData, FooterProps } from "@/types/global";
import { useEffect } from "react";
import styles from "@/styles/Footer.module.css";

const DB_API_URI = process.env.NEXT_PUBLIC_DB_API_URI;

const Footer = ({ changeUser }: FooterProps) => {
  const endpoint = `${DB_API_URI}/users`;

  const { isLoading, error, data } = useQuery(
    ["usersData"],
    (): Promise<Array<UserData>> => fetch(endpoint).then(res => res.json())
  );

  useEffect(() => {
    if (data) changeUser(data[0]);
  }, [data]);

  function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const user = data?.find(({ id }) => id === parseInt(e.target.value));
    if (user) changeUser(user);
  }

  return (
    <>
      { isLoading && <div>{"Loading..."}</div> }
      { error && error instanceof Error && <div> {`Error: ${error.message}`} </div> }
      { !isLoading && data &&
        <div className={styles.footerContainer}>
          <h3>Herd owner: </h3>
          <select className={styles.userDropdown} name="users" id="users" onChange={ e => handleOnChange(e) }>
            { data.map((user) => {
              return <option value={user.id} key={user.id}>{user.firstName}</option>
            }) }
          </select>
        </div>
      }
    </>
  );
};
export default Footer;