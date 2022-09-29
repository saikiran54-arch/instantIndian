import { initializeApp } from "@firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut,
signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, onSnapshot, doc, query, orderBy, getDocs, serverTimestamp, getDoc,setDoc,set } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDWQbBwUTdcw-_C0lLcFxbP0ej4shx-4s8",
    authDomain: "instantindian-10115.firebaseapp.com",
    projectId: "instantindian-10115",
    storageBucket: "instantindian-10115.appspot.com",
    messagingSenderId: "915082138910",
    appId: "1:915082138910:web:a758c82ea458ac5ae1e50f",
    measurementId: "G-YJDPN4EH5N"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)





// const createUserDocument = async() =>{
//     if(!user) return;

//     const userRef = db.collection('users').doc(auth.currentUser.uid);

//     const snapshot = userRef.getDoc();

//     // if(!snapshot.exists){
//     //     const {email} = user;
//     //     const {displayName} = additonalData;

//     //     try{
            
//     //     }catch(err){
//     //         console.log("error in creating user");
//     //     }
//     // }
//     userRef.setDoc({
//         createdAt : new Date(),
//     });

// };






// signing up new users
const signUpForm = document.querySelector('.signupform');
signUpForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const userName = signUpForm.username.value;
    const email = signUpForm.email.value;
    const password = signUpForm.email.value;

    // user.displayName = userName;
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
            const modal = document.querySelector("#modal-login");
            M.Modal.getInstance(modal).close();
            signUpForm.reset();
        })
    .catch((err)=>{
        const errorMessage = err.message;
        alert(errorMessage);
    })
    
    
})

//signing current user
const loginForm = document.querySelector('.loginform');
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.email.value;

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const modal = document.querySelector("#modal-login");
    loginForm.reset();
    M.Modal.getInstance(modal).close();
    const user = userCredential.user;
    console.log("user",user.email);

  })
  .catch((error) => {
    const errorMessage = error.message;
    loginForm.reset();
    alert("user not found , please sign-up",errorMessage);
  });
    
})


onAuthStateChanged(auth,(user)=>{
    var loginbtn = document.querySelector('#login');
    var cart = document.querySelector('#cart');
    var acc = document.querySelector('#acc');
    var logoutbtn = document.querySelector('#logout');
    if(user){
        loginbtn.style.display = "none";
        logoutbtn.style.display ="block";
        cart.style.display = "block";
        acc.style.display ="block";
    }
    else{
        loginbtn.style.display="block";
        logoutbtn.style.display="none";
        cart.style.display = "none";
        acc.style.display ="none";

    }
})
const logout = document.querySelector(".logout-button");
logout.addEventListener('click',(e)=>{
    signOut(auth).then(()=>{
        console.log("logout sucess");
    }).catch((error)=>{
        console.log("logout err",error.message);
    })
})




// adding documents
const addItemForm = document.querySelector('.add');
addItemForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        item: addItemForm.item.value,
        category: addItemForm.category.value,
        description: addItemForm.description.value,
        ingredients: addItemForm.ingredients.value,
       calories: addItemForm.calories.value,
        price: addItemForm.price.value,
        createdAt: serverTimestamp()
    })
    .then(()=> {
        addItemForm.reset()
    })
})

//data on console
onSnapshot(q, (snapshot) => {
    let foodItems = []
    snapshot.docs.forEach((doc) => {
        foodItems.push({ ...doc.data(), id: doc.id})
    })
    console.log(foodItems)
})

const fetchForm = document.querySelector(".fetch");
const foodInfo = document.querySelector(".food_info");
fetchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const docRef = doc(db,'foodItems',fetchForm.food_id.value);
    getDoc(docRef)
    .then((doc)=>{
        // foodInfo.innerText = doc.data().ingredients;
        const child = document.createElement('h1');
        foodInfo.append(child);
        child.innerHTML = doc.data().item;
    })
})

console.log("hello")