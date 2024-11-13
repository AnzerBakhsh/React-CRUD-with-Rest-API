import { useEffect, useState } from "react"; 
import { getpost } from "@/API/postapi"; 
import { deletepost } from "@/API/postapi";
import "../App.css"; 
import { Form } from "./Form";

export const Posts = () => { 
  const [data, setData] = useState([]); 
  const [updateData, setupdateData] = useState({}); // Track the data to edit

  // Fetch posts data
  const getpostData = async () => { 
    const res = await getpost(); 
    console.log(res.data); 
    setData(res.data); 
  }; 

  useEffect(() => { 
    getpostData(); 
  }, []); 

  // Function to delete post
  const handledeletepost = async (id) => {
    try {
      const res = await deletepost(id);
      if (res.status === 200) {
        const updatedData = data.filter((curPost) => curPost.id !== id);
        setData(updatedData); 
      } else {
        console.log("Failed to delete the post", res.status);
      }
    } catch (error) {
      console.error("Error while deleting the post:", error);
    }
  };

  // Function to handle post update
  const handleUpdatepost = (curElem) => {
    setupdateData(curElem); // Set the post to update
  };
  
  return ( 
    <>
      <section className="section-form">
        <Form 
          data={data} 
          setData={setData}
          updateData={updateData} // Pass updateData prop to Form component
          setupdateData={setupdateData} // Pass setupdateData prop to Form component
        />
      </section>

      <section className="section-post">
        <ol>
          {data.map((curElem) => {
            const { id, body, title } = curElem;
            return (
              <li key={id}>
                <p>ID: {id}</p>
                <p>TITLE: {title}</p>
                <p>CONTENT: {body}</p>
                <button onClick={() => handleUpdatepost(curElem)}>Edit</button>
                <button className="btn-delete" onClick={() => handledeletepost(id)}>Delete</button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};
