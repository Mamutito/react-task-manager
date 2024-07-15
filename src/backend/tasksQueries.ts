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
import { taskListType, taskType } from "../types";
import { db } from "./firebase";
import { COLLECTIONS } from "../utils/constants";
import { toastErr } from "../utils/toast";

export const FB_setTaskList = async (
  { title, id }: taskListType,
  uid: string
) => {
  let docId = id;
  try {
    if (docId.length > 5) {
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
    return await FB_getTaskList(docId);
  } catch (error) {
    throw error;
  }
};

export const FB_getTaskList = async (
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
    throw error;
  }
};

export const FB_getAllTaskList = async (
  uid: string
): Promise<taskListType[]> => {
  const q = query(
    collection(db, COLLECTIONS.TASKLIST), // Asegúrate de que "TASKLIST" es el nombre correcto de tu colección
    where("uid", "==", uid),
    orderBy("createdDate") // Asegúrate de que este campo existe y está indexado en Firestore
  );

  try {
    const querySnapshot = await getDocs(q);
    const currentTaskLists: taskListType[] = [];

    for (const doc of querySnapshot.docs) {
      const { title } = doc.data();
      const tasks = await FB_getAllTasks(doc.id);

      currentTaskLists.push({ id: doc.id, title, tasks, editMode: false });
    }

    return currentTaskLists;
  } catch (error) {
    console.error("Error fetching task lists: ", error);
    throw error;
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

export const FB_setTask = async (task: taskType, listId: string) => {
  const { id, description, title } = task;
  try {
    if (id.length > 5) {
      // await updateDoc(doc(db, COLLECTIONS.TASKLIST, id), {
      //   title,
      // });
    } else {
      const listData = await addDoc(
        collection(db, COLLECTIONS.TASKLIST, listId, COLLECTIONS.TASKS),
        {
          title,
          description,
          createdDate: serverTimestamp(),
        }
      );
      return listData.id;
    }
  } catch (error) {
    throw error;
  }
};

const FB_getAllTasks = async (tlid: string) => {
  const tasks: taskType[] = [];
  try {
    const tasksSnapshot = await getDocs(
      collection(db, COLLECTIONS.TASKLIST, tlid, COLLECTIONS.TASKS)
    );

    for (const task of tasksSnapshot.docs) {
      const { title, description } = task.data();
      tasks.push({
        id: task.id,
        title,
        description,
        editMode: false,
        collapsed: true,
      });
    }
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    throw error;
  }
};
