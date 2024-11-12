import { postdata } from "@/API/postapi";
import { useState } from "react";


 export const  Form =({data , setData})=> {
    // const [data, setData] = useState([]);
     const [addData , setaddData] = useState({
        title:"",
        body:"",
     });
     const handleInputChange =(e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setaddData((prev)  => {
            return{
                ...prev,
                [name]:value,
            };
        });
     }
     const addPostData = async() =>{
        const res = await postdata(addData);
        console.log("res", res);
    
        if (res.status === 201) {
            setData([...data, res.data]);
            // setData(prevData => [...prevData, data]);
            setaddData({ title: " ", body: " " });
       
        }
      };
     
     const handleFormSubmit =(e) =>{
        e.preventDefault();
        addPostData();
     }
    return(
        <form onSubmit={handleFormSubmit} >
        <div>
          <label htmlFor="title"></label>
          <input
            type="text"
            autoComplete="off"
            id="title"
            name="title"
            placeholder="Add Title"
            value={addData.title}
            onChange={handleInputChange}
          />
        </div>
  
        <div>
          <label htmlFor="body"></label>
          <input
            type="text"
            autoComplete="off"
            placeholder="Add Post"
            id="body"
            name="body"
            value={addData.body}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add</button>
        
      </form>
    );
};