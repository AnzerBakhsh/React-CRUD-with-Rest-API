import { useEffect, useState } from "react"; 
import React from "react"; 
import { getpost } from "@/API/postapi"; 
import "../App.css";

export const Posts = () => { 
  const [data, setData] = useState([]); 

  const getpostData = async () => { 
    const res = await getpost(); 
    console.log(res.data); 
    setData(res.data); 
  }; 

  useEffect(() => { 
    getpostData(); 
  }, []); 

  return ( 
    <section className="section-post">
      <ol>
        {data.map((curElem) => {
          const {id, body, title } = curElem;
          return (
            <li  key={id}>
                <p>ID:{id}</p>
              <p>{title}</p>
              <p>{body}</p>
              <button>Edit</button>
              <button  className="btn-delete" >Delete</button>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
