
//import { getFirestore, collection, addDoc } from "firebase/firestore";

//const db = getFirestore();
//const addCard = async (boardId, cardData) => {
//  try {
//    const docRef = await addDoc(collection(db, "boards", boardId, "cards"), cardData);
//    console.log("Document written with ID: ", docRef.id);
//  } catch (e) {
//    console.error("Error adding document: ", e);
//  }
//};



//import { getFirestore, collection, getDocs } from "firebase/firestore";

//const db = getFirestore();
//const getCards = async (boardId) => {
//  const querySnapshot = await getDocs(collection(db, "boards", boardId, "cards"));
//  querySnapshot.forEach((doc) => {
//    console.log(`${doc.id} => ${doc.data()}`);
//  });
//};


//import { getFirestore, doc, updateDoc } from "firebase/firestore";

//const db = getFirestore();
//const updateCard = async (boardId, cardId, cardData) => {
//  const cardRef = doc(db, "boards", boardId, "cards", cardId);
//  await updateDoc(cardRef, cardData);
//};



//import { getFirestore, doc, deleteDoc } from "firebase/firestore";

//const db = getFirestore();
//const deleteCard = async (boardId, cardId) => {
//  await deleteDoc(doc(db, "boards", boardId, "cards", cardId));
//};



