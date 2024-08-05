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
const todo = document.querySelector(`#todo`);
const ul = document.querySelector(`#list`);
const select = document.querySelector(`#select`);
const citiesbtn = document.querySelectorAll(`.cities-btn`);
const reset = document.querySelector(".reset"); 



let array = [];





// CITIES DEFINE 

citiesbtn.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      array = [];
      console.log(event.target.innerHTML);
      const todosRef = collection(db, "todos");
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
        const q = query(collection(db , "todos") , orderBy("time" , "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            array.push({ ...doc.data() , id: doc.id });
        });
        console.log(array);
        renderTodo();       
    }

getData();






// RENDER DATA ON SCREEN

function renderTodo(){

    ul.innerHTML = "";
    if(array.length === 0){
        ul.innerHTML = "no data found";
        return;
    }

    array.map((item) => {
        ul.innerHTML += `
        <li>${item.todo}</li>
        <button class="deleteBtn btn btn-primary">Delete</button>
        <button class="editBtn btn btn-primary">Edit</button>
        <p>${item.time ? item.time.toDate() : "no time"}</p>
        <hr>
        `;
    });







// Delete and Edit Button

const deletebtn = document.querySelectorAll(`.deletebtn`);
const editbtn = document.querySelectorAll(`.editbtn`);

// Delete Button


deletebtn.forEach((btn , index) => {
    btn.addEventListener("click" , async () => {
    console.log(array[index]);
    await deleteDoc(doc(db , "todos" , array[index].id));
    console.log("Data Deleted");
    array.splice(index , 1);
    renderTodo();
    });
});





// Edit Button

editbtn.forEach((btn , index) => {
    btn.addEventListener("click" , async () => {
        const updatedNewValue = prompt("Enter New Value");
        const todoUpdate = doc(db , "todos" , array[index].id);
        await updateDoc(todoUpdate , {
        todo:updatedNewValue,
        });
        console.log("Data Updated");
        array[index].todo = updatedNewValue;
        renderTodo();
    });
});


};




form.addEventListener(`submit` , async (event) => {
    event.preventDefault();

    try {
        const docRef = await addDoc(collection(db, "todos"), {
        todo: todo.value,
        city: select.value,
        time: Timestamp.fromDate(new Date()),
        });
        console.log("Document written with ID: ", docRef.id);
        array.push({
          todo: todo.value,
          id: docRef.id,
          city: select.value,
        });
        renderTodo();
        todo.value = ``;
      } catch (e) {
        console.error("Error adding document: ", e);
      }   
});