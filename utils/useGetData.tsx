import { useQuery } from "react-query";
import { UserData } from "@/types/global";

const DB_API_URI = "http://localhost:3001";

const useGetData = (userID: number, getType: string) => {
  const endpoint = `${DB_API_URI}/${getType}/${userID}`;
  return useQuery(
    ["userData", userID],
    (): Promise<UserData> => fetch(endpoint).then(res => res.json())
  );
};
export default useGetData;