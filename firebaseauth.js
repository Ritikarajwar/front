 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js"
 import{getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"
 import{getFirestore , setDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"


 
 const firebaseConfig = {
    apiKey: window.config.FIREBASE_API_KEY,
    authDomain: window.config.FIREBASE_AUTH_DOMAIN,
    projectId: window.config.FIREBASE_PROJECT_ID,
    storageBucket: window.config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: window.config.FIREBASE_MESSAGING_SENDER_ID,
    appId: window.config.FIREBASE_APP_ID,
    measurementId: window.config.FIREBASE_MEASUREMENT_ID,
}
 

 const app = initializeApp(firebaseConfig)
 const analytics = getAnalytics(app)
 const auth = getAuth(app)
 const db = getFirestore(app)
 

 let email = document.querySelector("#email")
 let name = document.querySelector("#name")
 let password = document.querySelector("#password")
 let signupForm = document.querySelector("#signup_form")
 let loginForm = document.querySelector('#login_form')


 if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault()

        
        let NameValue = name.value
        let emailValue = email.value
        let passwordValue = password.value

       
        if (NameValue && emailValue && passwordValue) {
            
            alert(`Signing up with name: ${NameValue}, email: ${emailValue}`)

            createUserWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((userCredential)=>{
                const user = userCredential.user
                const userData = {
                    email: emailValue,
                    name : NameValue,
                    password : passwordValue
                }
                alert('account created successfully')
                const docRef = doc(db,"users",user.uid)
                setDoc(docRef,userData)
                .then(()=>{
                    window.location.href='login.html'
                })
                .catch((error)=>{
                    console.error("error writing document",error)
                })
            })
            .catch((error)=>{
                const errorCode = error.code;
                const errorMessage = error.message;
                if(errorCode =='auth/email-already-in-use'){
                    alert('email address already exist !!!')
                }
                else{
                    alert(`Unable to create user: ${errorMessage}`)
                }
            })
        } else {
            alert("Please fill in all fields.")
            
        }
    })
}


if(loginForm){
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault()
        let emailValue = email.value
        let passwordValue = password.value

        if(emailValue && passwordValue){
            alert(`Loging in with email: ${emailValue}`)

            signInWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                  
                    const user = userCredential.user
                    alert('Login successful!')

                    localStorage.setItem('user', JSON.stringify({
                        uid: user.uid,
                        email: user.email
                    }))
                  
                    window.location.href = 'add.html'
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    console.error("Error logging in:", errorCode, errorMessage)
                    alert(`Unable to log in: ${errorMessage}`)
                })

        }
    })
}