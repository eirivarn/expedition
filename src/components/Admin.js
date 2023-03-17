//import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { db } from '../firebase-config';
//import { auth } from '../firebase-config';
//import { UserAuth } from "../Context/AuthContext";
import { doc , getDoc} from "firebase/firestore";
import { useState, useEffect } from 'react';

const [isAdmin, setIsAdmin] = useState(false);


const isUserIdInArray = async (collectionName, docId, arrayFieldName, userId) => {
  try {
    // Retrieve the document from Firestore
    const docRef = doc(db, collectionName, docId);
    const docSnapshot = await getDoc(docRef);

    // Check if the document exists
    if (!docSnapshot.exists()) {
      console.log("No such document!");
      return false;
    }

    // Get the array from the document
    const userArray = docSnapshot.get(arrayFieldName);

    // Check if the array exists and if the userId is in the array
    if (userArray && Array.isArray(userArray) && userArray.includes(userId)) {
      return true;
    }

    return false;

  } catch (error) {
    console.error("Error retrieving document: ", error);
    return false;
  }
};

const AdminUser = async () => {
  const collectionName = "roles";
  const docId = "eHpUakLV9o1r9zA6h6Qs";
  const arrayFieldName = "admin";
  const userId = "johanotto96@gmail.com";

  const isUserInArray = await isUserIdInArray(collectionName, docId, arrayFieldName, userId);
  console.log("Is userId in the array: ", isUserInArray);
  return isUserIdInArray;
};

useEffect(() => {
  const checkAdminStatus = async () => {
    const adminStatus = await AdminUser();
    setIsAdmin(adminStatus);
  };

  checkAdminStatus();
}, []);


export default isAdmin;
