import { db } from "../../firebase/firebase";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

/**
 * Add a new todo into Firestore
 * @param {Object} todo - Todo object { title, description, category, completed }
 */
export async function addTodo(todo) {
  console.log(todo);
  try {
    const docRef = await addDoc(collection(db, "Todos"), {
      ...todo,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (err) {
    throw new Error("Getting error during adding todos");
  }
}

export async function getTodos() {
  try {
    // Optionally order by createdAt (latest first)
    const q = query(collection(db, "Todos"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    // Map docs into an array
    const todos = querySnapshot.docs.map((doc) => ({
      id: doc.id, // include Firestore document ID
      ...doc.data(),
    }));

    return todos;
  } catch (err) {
    throw new Error("Error fetching todos: " + err.message);
  }
}

export async function getTodosByCategory(category) {
  console.log(category);
  try {
    const q = query(
      collection(db, "Todos"),
      where("category", "==", category), // filter by category
      orderBy("createdAt", "desc") // optional: sort newest first
    );

    const querySnapshot = await getDocs(q);

    const todos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(todos);
    return todos;
  } catch (err) {
    throw new Error("Error fetching todos by category: " + err.message);
  }
}


