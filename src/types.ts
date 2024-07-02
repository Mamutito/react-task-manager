export type setLoadingType = React.Dispatch<React.SetStateAction<boolean>>;
export type authDataType = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type userType = {
  id: string;
  isOnline: boolean;
  img: string;
  username: string;
  email: string;
  creationTime?: string;
  lastSeen?: string;
  bio?: string;
};
