export interface UserData {
  id: number;
  firstName: string;
  lastname: string;
  wallet: number;
  herd: CatCardProps[];
}

export interface UsersData {
  [id: number]: UserData;
}

export interface CatCardProps {
  nickname: string;
  imageID: string;
  imageURI: string;
  breed?: string;
  breedId?: string;
  width?: number;
  height?: number;
  className?: string;
}

export interface FooterProps {
  changeUser(id:number): void
}

export interface CardPanelProps {
  userID: number;
}