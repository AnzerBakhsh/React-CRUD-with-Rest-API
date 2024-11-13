import { postdata, updatedata } from "@/API/postapi";
import { useEffect, useState } from "react";

export const Form = ({ data, setData, updateData, setupdateData }) => {
  const [addData, setaddData] = useState({
    title: "",
    body: "",
  });

  // Check if updateData is empty or not to determine Add or Edit mode
  const isEmpty = Object.keys(updateData).length === 0;

  // Populate the form with `updateData` if available (Edit mode)
  useEffect(() => {
    if (updateData && updateData.id) {
      setaddData({
        title: updateData.title || "",
        body: updateData.body || "",
      });
    }
  }, [updateData]); // Trigger this effect whenever `updateData` changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setaddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPostData = async () => {
    try {
      const res = await postdata(addData);
      console.log("Post added:", res);

      if (res.status === 201) {
        setData([...data, res.data]);
        setaddData({ title: "", body: "" }); // Clear form after adding
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const updatePostData = async () => {
    try {
      const res = await updatedata(updateData.id, addData); // Pass the correct id and data
      console.log("Post updated:", res);

      if (res.status === 200) {
        setData((prev) =>
          prev.map((curElem) =>
            curElem.id === res.data.id ? res.data : curElem
          )
        );
        setaddData({ title: "", body: "" }); // Clear form after update
        setupdateData({}); // Reset updateData state to go back to "Add" mode
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEmpty) {
      addPostData();
    } else {
      updatePostData();
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
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

      <button type="submit">{isEmpty ? "Add" : "Edit"}</button>
    </form>
  );
};
