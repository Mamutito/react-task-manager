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
export type FormProfileData = {
  img: string;
  email: string;
  username: string;
  password: string;
  "password-confirm": string;
};

export type taskListType = {
  id: string;
  title: string;
  editMode?: boolean;
  tasks: taskType[];
};

export type taskType = {
  id: string;
  title: string;
  description: string;
  editMode?: boolean;
  collapsed?: boolean;
};
