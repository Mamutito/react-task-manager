import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import CatchErr from "../utils/catchErr";
import { authDataType, setLoadingType } from "../types";

export const FB_AuthSignUp = async (
  { email, password }: authDataType,
  setLoading: setLoadingType
) => {
  setLoading(true);
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCred.user;
  } catch (error: any) {
    CatchErr(error);
  } finally {
    setLoading(false);
  }
};
export const FB_AuthSignIn = async (
  { email, password }: authDataType,
  setLoading: setLoadingType
) => {
  setLoading(true);
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    return userCred.user;
  } catch (error: any) {
    CatchErr(error);
  } finally {
    setLoading(false);
  }
};
