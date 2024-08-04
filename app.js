import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"; 
import { db } from "./config.js";


const form = document.querySelector(`#form`);
const input = document.querySelector(`#firestore`);
const ul = document.querySelector(`#list`);

const array = [];

async function getData(){
    const querySnapshot = await getDocs(collection(db , `posts`));
    querySnapshot.forEach((doc) => {
    console.log(doc.data());
    array.push(doc.data());
    });
    console.log(array);
    renderTodo();
    
}

getData();


function renderTodo(){
    ul.innerHTML = ``;
    if(array.length === 0){
        ul.innerHTML = "No data found";
        return;
    }

    array.map((item) => {
        ul.innerHTML += `
        <li>${item.posts}</li>
        `;
    });
}


form.addEventListener(`submit` , async (event) => {
    event.preventDefault();
    array.push({
        input: input.value
    });
    renderTodo();
    try {
        const docRef = await addDoc(collection(db, "posts"), {
        input: input.value,
        uid: auth.currentUser.uid
        });
        input.value = ``;
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    
    
});