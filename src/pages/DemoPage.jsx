import React, { useState } from "react";
import { db } from '../firebase-config';
import { collection, getDocs, setDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

// Eksempel-side som viser hvordan man kan skrive API-er for å hente/lagre data fra/til Firebase
const DemoPage = () => {
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);
    const [users, setUsers] = useState([]);

    const collectionName = "users"; // navn på collection
    const usersReference = collection(db, collectionName);

    /**
    |--------------------------------------------------
    | I metodene under bruker vi asynkrone funksjoner for
    | å gjøre kall til og fra Firebase. 
    |
    | Les her for mer info om JavaScript async ():
    | https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous
    |--------------------------------------------------
    */

    // API-kall som legger til en ny bruker i firebase.
    // Bruker setDoc() her fordi vi vil gi inn egen id, dersom vi
    // ville latt Firebase aut-generere ID hadde addDoc() vært lettere
    const createFirebaseUser = async () => {
        const newId = crypto.randomUUID();
        const docRef = doc(db, "users", newId);
        const newUser = {
            id: newId,
            name: newName,
            age: newAge
        };
        await setDoc(docRef, newUser).catch((err) => console.error(err));
        setUsers((prev) => [...prev, newUser]);
    };

    // API-kall som endrer alderen på en gitt bruker
    const updateFirebaseUser = async (id, newAge) => {
        const userDoc = doc(db, collectionName, id);
        const newFields = {
            age: newAge
        }
        await updateDoc(userDoc, newFields).catch((err) => console.error(err));
        setUsers((prev) => {
            const user = users.find((u) => u.id === id)
            const idx = prev.findIndex((u) => u.id === id);
            return [...prev.slice(0, idx), { name: user.name, age: newAge, id: user.id }, ...prev.slice(idx + 1)];
        })
    };

    // API-kall som henter ned alle brukere lagret på firebase
    const getAllFirebaseUsers = async () => {
        const data = await getDocs(usersReference);
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };

    // API-kall som sletter brukere fra firebase
    const deleteFirebaseUser = async (id) => {
        const userDoc = doc(db, collectionName, id);
        await deleteDoc(userDoc).catch((err) => console.error(err));
        
        //const user = users.find((u) => u.id === id);
        const idx = users.findIndex((u) => u.id === id);
        setUsers((prev) => [...prev.slice(0, idx), ...prev.slice(idx+1)]);
    }


    // Hjelpemetode som kalles når brukeren trykker på "Save user to database"
    // Da vil det først gjøres et kall til createFireBaseUser, før 
    // navn-input og alder-input nullstilles
    const handleCreateUserClick = () => {
        createFirebaseUser();
        document.getElementById("newNameInputField").value = "";
        document.getElementById("newAgeInputField").value = "";
    } 

    // Samme som i forrige, bare at her setter den alder til gitt verdi
    const assignNewAge = (userId) => {
        const newAge = document.getElementById(userId + "newAge").value;
        updateFirebaseUser(userId, newAge);
        document.getElementById(userId + "newAge").value = "";
    }

    return (
        <div className="App">
            <div>
                <h1>Demo page</h1>
                <button onClick={getAllFirebaseUsers}>Click to load all users</button>
                <p>Use the fields below to add a new user</p>
            </div>
            <div>
                <input id="newNameInputField" placeholder="Name..." onChange={(e) => { setNewName(e.target.value) }}/>
                <input id="newAgeInputField" type="number" placeholder="Age..." onChange={(e) => { setNewAge(e.target.value) }}/>
                <button onClick={handleCreateUserClick}>Save user to database</button>
                {users.map((user) => {
                    return (
                        <div key={user.id}>
                            {" "}
                            <h1>Name: {user.name}</h1>
                            <h1>Age: {user.age}</h1>
                            <button onClick={() => { updateFirebaseUser(user.id, parseInt(user.age) + 1) }}>Increment age by 1</button>
                            <input id={user.id + "newAge"} type="number" placeholder="Assign new age"/>
                            <button onClick={() => { assignNewAge(user.id) }}>Sumbit</button>
                            <button onClick={() => { deleteFirebaseUser(user.id) }}>Delete user</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default DemoPage;