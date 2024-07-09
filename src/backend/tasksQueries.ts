import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { setLoadingType, taskListType } from "../types";
import { db } from "./firebase";
import { COLLECTIONS } from "../utils/constants";
import CatchErr from "../utils/catchErr";
import { toastErr } from "../utils/toast";

export const FB_setTaskList = async (
  setLoading: setLoadingType,
  { title, id }: taskListType,
  uid: string
) => {
  setLoading(true);
  try {
    if (id.length > 5) {
      //update the current tasklist
    } else {
      const listData = await addDoc(collection(db, COLLECTIONS.TASKLIST), {
        uid,
        title,
      });

      return await getTaskList(listData.id);
    }
  } catch (error: any) {
    CatchErr(error);
  } finally {
    setLoading(false);
  }
};

export const getTaskList = async (id: string) => {
  const docData = await getDoc(doc(db, COLLECTIONS.TASKLIST, id));
  if (docData.exists()) {
    const data = docData.data();
    return { id: docData.id, uid: data.uid, title: data.title };
  } else {
    toastErr("getTaskList: taskList not found");
    return;
  }
};
export const getAllTaskList = async (uid: string) => {
  const q = query(
    collection(db, COLLECTIONS.TASKLIST),
    where("uid", "==", uid)
  );

  const querySnapshot = await getDocs(q);
  const currentTaskLists: taskListType[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    // currentTaskLists.push({ id: doc.id, ...data });
    // console.log(doc.id, " => ", doc.data());
  });
};
