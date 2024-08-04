import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    Timestamp,
    query,
    where,
    orderBy,
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
  import { db } from "./config.js";





const form = document.querySelector(`#form`);
const input = document.querySelector(`#firestore`);
const ul = document.querySelector(`#list`);
const select = document.querySelector(`#select`);
const cities = document.querySelectorAll(`.k1`);
const reset = document.querySelector(".reset"); 



let array = [];





// CITIES DEFINE 

cities.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      array = [];
      console.log(event.target.innerHTML);
      const todosRef = collection(db, "posts");
      const q = query(
        todosRef,
        where("city", "==", event.target.innerHTML),
        orderBy("time", "desc")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        array.push({ ...doc.data(), id: doc.id });
      });
      console.log(array);
      renderTodo();
    });
  });







// RESET BUTTON

reset.addEventListener("CLICK" , getData);

    async function getData(){
        array = [];
        const q = query(collection(db , "posts") , orderBy("time" , "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            array.push({ ...doc.data() , id: doc.id });
        });
        console.log(array);
        renderTodo();       
    }






// RENDER DATA ON SCREEN

function renderTodo(){

    ul.innerHTML = "";
    if(array.length === 0){
        ul.innerHTML = "";
        return;
    }

    array.map((item) => {
        ul.innerHTML += `
        <li>${item.posts}</li>
        <button class="deleteBtn btn btn-primary">Delete</button>
        <button class="editBtn btn btn-primary">Edit</button>
        <p>${item.time ? item.time.toDate() : ""}</p>
        <hr>
        `;
    });
};






// Delete and Edit Button

const deletebtn = document.querySelectorAll(`#delete`);
const editbtn = document.querySelectorAll(`#edit`);

// Delete Button


deletebtn.forEach((btn , index) => {
    btn.addEventListener("click" , async () => {
    console.log(array[index]);
    await deleteDoc(doc(db , "posts" , array[index].id));
    console.log("Data Deleted");
    array.splice(index , 1);
    renderTodo();
    });
});





// Edit Button

editbtn.forEach((btn , index) => {
    btn.addEventListener("click" , async () => {
        const updatedNewValue = prompt("Enter New Value");
        const todoUpdate = doc(db , "posts" , array[index].id);
        await updateDoc(todoUpdate , {
        posts:updatedNewValue,
        });
        console.log("Data Updated");
        array[index].posts = updatedNewValue;
        renderTodo();
    });
});







form.addEventListener(`submit` , async (event) => {
    event.preventDefault();
    array.push({
        input: input.value
    });
    renderTodo();
    try {
        const docRef = await addDoc(collection(db, "posts"), {
        input: input.value,
        });
        input.value = ``;
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    
    
});