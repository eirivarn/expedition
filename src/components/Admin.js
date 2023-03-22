import { db } from "../firebase-config";
import { doc, getDoc } from "@firebase/firestore";
//import { useEffect, useState } from "react";

const checkUserIdInField = async (collectionName, docId, userEmail) => {
  try {
    // Retrieve the document from Firestore
    const docRef = doc(db, collectionName, docId);
    const docSnapshot = await getDoc(docRef);

    // Check if the document exists
    if (!docSnapshot.exists()) {
      console.log("No such document!");
      return false;
    }

    const fieldValue = docSnapshot.data().admins;

    if (fieldValue.includes(userEmail)) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error retrieving document: ", error);
    return false;
  }
};

/*const AdminUser = () => {
  const [isUserIdInField, setIsUserIdInField] = useState(false);
  const userId = "SYysAQf44jNiCBdVJWnJubhtcWg2"; // Replace this with your actual user ID

  useEffect(() => {
    const checkUserIdInField = async () => {
      const result = await isUserIdInField("roles", "eHpUakLV9o1r9zA6h6Qs", "admin", userId);
      setIsUserIdInField(result);
    };

    checkUserIdInField();
  }, [userId]);

  
}; */

export default checkUserIdInField;
