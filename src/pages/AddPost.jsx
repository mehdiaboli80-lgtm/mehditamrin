import { useContext, useState } from "react";
import styled from "./../pages/addpost.module.css";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import { appcontext } from "../App";

function AddPost() {
  
    const { isloggin, setIsloggin } = useContext(appcontext);
    const[detail,setDetail]=useState([]);

    const getDetail=(e)=>{

        setDetail((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value

        }));


    }

    const addDetail=()=>{
      axios.post("http://localhost:8000/articles",{
        id:detail.id,
        imageUrl:detail.imageUrl,
        cost:detail.cost,
        name:detail.name

      });
    }

    console.log(detail);
  return (

    
    <div>
    <Navbar />

    {
        isloggin ? (

          <div className={styled.formBox}>
      <div className={styled.myinputes}>
        <label>آیدی کالا:</label>
        <input type="text" name="id" onChange={getDetail} />
      </div>
      <div className={styled.myinputes}>
        <label>عکس کالا:</label>
        <input type="text" name="imageUrl" onChange={getDetail} />
      </div>
      <div className={styled.myinputes}>
        <label>نام کالا:</label>
        <input type="text" name="name" onChange={getDetail} />
      </div>
      <div className={styled.myinputes}>
        <label>قیمت کالا:</label>
        <input type="text" name="cost" onChange={getDetail} />
       
      </div>

       <div className={styled.myButton}>
          <button type="submit"onClick={addDetail}>ایجاد پست</button>
        </div>

    </div>

        ) : <><p>you shuld loggin first</p><button onClick={()=>setIsloggin(true)}>loggin</button></>
    }

    
    
    
    </div>
  );
}

export default AddPost;
