import logo from './logo.svg';
import './App.css';
import { FaPlus } from "react-icons/fa6";
import Todo from './Components/Todo';
import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, query, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
}


function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  //create Todo
  const createTodo = async (e) => {
    e.preventDefault(e)
    if (input === '') {
      alert("Please enter a valid todo")
      return
    }

    await addDoc(collection(db, 'todos'), {
      name: input,
      completed: false
    })


  }

  //Read Todo
  useEffect(() => {

    const dbref = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(dbref, (snapshot) => {
      let todoArr = []
      snapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id })
      });
      setTodos(todoArr)
      console.log("hewo")
    })
    return () => unsubscribe
  }, [])



  //update Todo
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }
  //Delete Todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input className={style.input} value={input} onChange={(e) => setInput(e.target.value)} type='text' placeholder='Add todos' />
          <button className={style.button}><FaPlus size={30} /></button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
          ))}
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        </ul>
      </div>
    </div>
  );
}

export default App;
