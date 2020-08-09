var firebaseConfig = {
    apiKey: "AIzaSyASvw80DuelGaKx3v3NoK4eo13tT_C1Q7U",
    authDomain: "dpprojekt-3d1fd.firebaseapp.com",
    databaseURL: "https://dpprojekt-3d1fd.firebaseio.com",
    projectId: "dpprojekt-3d1fd",
    storageBucket: "dpprojekt-3d1fd.appspot.com",
    messagingSenderId: "455950445352",
    appId: "1:455950445352:web:c551266cc5d56e5ecd7e1d",
    measurementId: "G-91EEZ5MBPF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function togglestate(id) {

    var modal = document.getElementById('modallogin');
    const signupbtn = document.getElementById("sign-up-btn");
    const loginbtn = document.getElementById("log-in-btn");
    const loginbox = document.getElementById("loginbox");
    const signupbox = document.getElementById('signupbox');
    console.log("wtf")
    console.log(signupbtn, loginbtn);
    if (id == loginbtn) {

        loginbtn.classList.remove("primary");
        loginbtn.classList.add("secondary");
        loginbox.style.display = "unset";
        loginbox.style.opacity = "1";
        signupbtn.classList.add("primary");
        signupbtn.classList.remove("secondary");
        signupbox.style.display = "none";
        signupbox.style.opacity = "0";
    } else {
        signupbtn.classList.remove("primary");
        signupbtn.classList.add("secondary");
        signupbox.style.display = "unset";
        signupbox.style.opacity = "1";
        loginbtn.classList.add("primary");
        loginbtn.classList.remove("secondary");
        loginbox.style.display = "none";
        loginbox.style.opacity = "0";
    }
}
/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    } else {
        var email = document.getElementById('email-in').value;
        var pass = document.getElementById('pass-in').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (pass.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            // console.log(error);
            document.getElementById('log-in').disabled = false;
            // [END_EXCLUDE]
        });
        // [END authwithemail]
    }
    document.getElementById('log-in').disabled = true;
}

//image file into storage
let file = {};

function chooseFile(e) {
    file = e.target.files[0];

}


function SignOut() {
    firebase.auth().signOut().then(function() {
        let main = document.getElementById("main-content");
        main.style.display = "none";
        document.getElementById('modallogin').style.display = "unset";
        console.log("signed out");
        alert("signed out");
    }).catch(function(error) {
        console.log(error);
    });

}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
    var email = document.getElementById('email-up').value;
    var pass = document.getElementById('pass-up').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (pass.length < 4) {
        alert('Please enter a password.');
        return;
    }
    // Create user with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then(auth => {
            firebase.storage().ref('user/' + auth.user.uid + '/profile.jpg').put(file).then(function() {
                console.log("uploaded");
            })
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });
    // [END createwithemail]
}



/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
    // [START sendemailverification]
    console.log("e v f working")
    firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
    });
    // [END sendemailverification]
}

function sendPasswordReset() {
    var email = document.getElementById('email-in').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
}




// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         modal.style.display = "none ";
//         firebase.storage().ref('user/' + user.uid + '/profile.jpg').getDownloadURL().then(imgUrl => {
//             img.src = imgUrl;
//         })
//     }
// })

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        // var modal = document.getElementById('modallogin');
        if (user) {
            let main = document.getElementById("main-content");
            let img = document.getElementById('img');
            var displayName = user.displayName;
            var email = user.email;
            console.log(email, displayName)
            main.style.display = "unset";
            document.getElementById('modallogin').style.display = "none ";
            firebase.storage().ref('user/' + user.uid + '/profile.jpg').getDownloadURL().then(imgUrl => {
                img.src = imgUrl;
            })

        }
    });
    // [END authstatelistener]


    document.getElementById('log-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('sign-up').addEventListener('click', handleSignUp, false);
    document.getElementById('verify-email').addEventListener('click', sendEmailVerification, false);
    document.getElementById('pass-reset').addEventListener('click', sendPasswordReset, false);
}

window.onload = function() {
    var modal = document.getElementById('modallogin');
    console.log(modal)
    modal.style.display = 'block';
    initApp();
};

window.onbeforeunload = function(e) {
    var message = "Please Log Out Before Leaving Window";
    e = e || window.event;
    alert(message);
    SignOut();
    if (e) {
        e.returnValue = message;
    }
    return message;
};