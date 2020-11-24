import React from "react";
import firebase from "../firebase/firebase";

function UserDetailAuth() {
    const [authUserd, setAuthUserd] = React.useState(null);
    function handleSnapshot(snapshot) {
        debugger
        const links = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        });
        localStorage.setItem("IsRC", links);
    
    };
    React.useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            if (user) {
                firebase.db.collection("users").where("uid", "==", user.aa.W).onSnapshot(handleSnapshot);     
            }  
        });

        return () => unsubscribe();
    }, []);

    return authUserd;
}

export default UserDetailAuth;
