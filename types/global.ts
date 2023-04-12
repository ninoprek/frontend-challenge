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

export interface CatImageData {
  id: string;
  url: string;
  width: number;
  height: number;
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
  changeUser(user: UserData): void
}

export interface CardPanelProps {
  user: UserData;
}

export interface CatCardCreatorProps extends CardPanelProps {
  updateUser(user: UserData): void
}

