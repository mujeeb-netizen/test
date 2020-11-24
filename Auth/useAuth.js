


import React from "react";
import firebase from "../firebase/firebase";

function useAuth() {

    const [authUserd, setAuthUserd] = React.useState(null);
    function handleSnapshot(snapshot) {
        snapshot.docs.map(doc => {
            debugger
            localStorage.setItem("IsRC", doc.data().SignUpStep.address);
        });
        

    }; 
    const [authUser, setAuthUser] = React.useState(null);

    React.useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            if (user) {
                firebase.db.collection("users").where("uid", "==", user.aa.W).onSnapshot(handleSnapshot);
                localStorage.setItem("IsUser",user.aa.W)
            } else {
                setAuthUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

 
}

export default useAuth;
