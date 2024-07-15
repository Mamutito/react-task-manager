import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { authDataType, userType } from "../types";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { COLLECTIONS } from "../utils/constants";
import { toastErr } from "../utils/toast";
import { defaultUser } from "../store/usersSlice";
import avatarGenerator from "../utils/avatarGenerator";

export const FB_AuthSignUp = async ({ email, password }: authDataType) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const username = user.email?.split("@")[0] || "";
    const userData = {
      uid: user.uid,
      email: user.email || "",
      username: username,
      img: avatarGenerator(username),
    };
    const userInfo = await addUserToCollection(userData);
    return userInfo;
  } catch (error: any) {
    throw error;
  }
};

export const FB_AuthSignIn = async ({ email, password }: authDataType) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    await updateUserInfo({ id: user.uid, isOnline: true });
    return await getUserInfo(user.uid);
  } catch (error: any) {
    throw error;
  }
};

export const FB_AuthSignOut = async (id: string) => {
  try {
    await signOut(auth);
    await updateUserInfo({ id, isOnline: false });
    return;
  } catch (error: any) {
    throw error;
  }
};

const addUserToCollection = async ({
  uid,
  email,
  username,
  img,
}: {
  uid: string;
  email: string;
  username: string;
  img: string;
}) => {
  try {
    await setDoc(doc(db, COLLECTIONS.USERS, uid), {
      isOnline: true,
      img,
      username,
      email,
      creationTime: serverTimestamp(),
      lastSeen: serverTimestamp(),
      bio: `Hi! my name is ${username}, thanks to mamutito for this site.`,
    });
    return await getUserInfo(uid);
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async (uid: string): Promise<userType> => {
  const userRef = doc(db, COLLECTIONS.USERS, uid);
  try {
    const user = await getDoc(userRef);
    if (user.exists()) {
      const { isOnline, img, username, email, creationTime, lastSeen, bio } =
        user.data();
      return {
        id: uid,
        isOnline,
        img,
        username,
        email,
        creationTime: creationTime.toDate().toLocaleString(),
        lastSeen: lastSeen.toDate().toLocaleString(),
        bio,
      };
    } else {
      toastErr("getUserInfo: user not found");
      return defaultUser;
    }
  } catch (error) {
    throw error;
  }
};

const updateUserInfo = async (data: Partial<userType>) => {
  const { id, ...updateData } = data;
  if (!id) {
    console.error("User ID is required to update user information.");
    return;
  }
  const userRef = doc(db, COLLECTIONS.USERS, id);
  try {
    await updateDoc(userRef, updateData);
  } catch (error) {
    throw error;
  }
};
