import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { setLoadingType, taskListType, taskType } from "../types";
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
  let docId = id;
  try {
    if (id.length > 5) {
      await updateDoc(doc(db, COLLECTIONS.TASKLIST, id), {
        title,
      });
    } else {
      const listData = await addDoc(collection(db, COLLECTIONS.TASKLIST), {
        uid,
        title,
        createdDate: serverTimestamp(),
      });
      docId = listData.id;
    }
    return await getTaskList(docId);
  } catch (error: any) {
    CatchErr(error);
  } finally {
    setLoading(false);
  }
};

export const getTaskList = async (
  id: string
): Promise<taskListType | undefined> => {
  try {
    const docData = await getDoc(doc(db, COLLECTIONS.TASKLIST, id));
    if (docData.exists()) {
      const data = docData.data();
      return { id: docData.id, title: data.title, tasks: [], editMode: false };
    } else {
      toastErr("getTaskList: taskList not found");
    }
  } catch (error) {
    CatchErr(error);
  }
};

export const getAllTaskList = async (uid: string) => {
  const q = query(
    collection(db, COLLECTIONS.TASKLIST),
    where("uid", "==", uid),
    orderBy("createdDate")
  );
  try {
    const querySnapshot = await getDocs(q);
    const currentTaskLists: taskListType[] = [];
    querySnapshot.forEach((doc) => {
      const { title } = doc.data();
      currentTaskLists.push({ id: doc.id, title, tasks: [], editMode: false });
    });
    return currentTaskLists;
  } catch (error) {
    CatchErr(error);
  }
};

export const FB_deleteTaskList = async (id: string, tasks: taskType[]) => {
  const listRef = doc(db, COLLECTIONS.TASKLIST, id);
  try {
    if (tasks.length > 0) {
      await Promise.all(tasks.map((task) => FB_deleteTask(id, task.id)));
    }
    await deleteDoc(listRef);
  } catch (error) {
    throw error;
  }
};

export const FB_deleteTask = async (tlid: string, tid: string) => {
  const taskRef = doc(db, COLLECTIONS.TASKLIST, tlid, COLLECTIONS.TASKS, tid);
  try {
    await deleteDoc(taskRef);
  } catch (error) {
    throw error;
  }
};
