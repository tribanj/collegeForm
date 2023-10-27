import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Courses from "../Components/Courses";
import { PORT } from "../Host";
import '../Form.css'

const Form = () => {
  // const [options, setOptions] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cutoff, setCutoff] = useState("");
  const [ratings, setRatings] = useState("");
  const [review, setReview] = useState("");
  const [renk, setRenk] = useState("");
  const [fee, setFee] = useState("");
  const [cources, setCources] = useState([]);
  const [courceDetails, setCourceDetails] = useState("");
  const [acceptedExams, setAcceptedExams] = useState("");
  const [avgpkg, setAvgpkg] = useState("");
  const [highpkg, setHighpkg] = useState("");
  const [image, setImage] = useState(null);

  // Add a state variable to track form submission success
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(cources);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("cutoff", cutoff);
    formData.append("ratings", ratings);
    formData.append("review", review);
    formData.append("renk", renk);
    formData.append("fee", fee);
    formData.append("cources", JSON.stringify(cources));
    formData.append("courceDetails", courceDetails);
    formData.append("acceptedExams", acceptedExams);
    formData.append("avgpkg", avgpkg);
    formData.append("highpkg", highpkg);
    formData.append("image", image);

    try {
      await axios.post(`${PORT}api/items`, formData, {
        "Content-Type": "multipart/form-data",
      });
      toast.success("Item saved successfully!");
      setIsFormSubmitted(true); // Set form submission success
      // Clear form fields
      setName("");
      setDescription("");
      setCutoff("");
      setRatings("");
      setReview("");
      setRenk("");
      setFee("");
      setCources("");
      setCourceDetails("");
      setAcceptedExams("");
      setAvgpkg("");
      setHighpkg("");
      setImage(null);
    } catch (error) {
      toast.error("An error occurred while saving the item.");
      console.log(error);
    }
  };

  // Function to reset the form
  const resetForm = () => {
    setName("");
    setDescription("");
    setCutoff("");
    setRatings("");
    setReview("");
    setRenk("");
    setFee("");
    setCources([]); 
    setCourceDetails("");
    setAcceptedExams("");
    setAvgpkg("");
    setHighpkg("");
    setImage(null);
    setIsFormSubmitted(false);
  };
  

  return (
    <>
      <h1 className="h1h">Fill the University Details</h1>
      {isFormSubmitted ? (
        <div>
          <p>Form submitted successfully!</p>
          <button onClick={resetForm}>Reset Form</button>
        </div>
      ) : (
        <div className="form-section">
          <form >
            <div className="input1">
              <input
                type="text"
                placeholder="University/College Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="input2">
              <input
                type="number"
                placeholder="Ratings"
                value={ratings}
                onChange={(e) => setRatings(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Write your thoughts"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
            </div>
            <div className="input3">
              <input
                type="text"
                placeholder="Cutoff "
                value={cutoff}
                onChange={(e) => setCutoff(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Renking"
                value={renk}
                onChange={(e) => setRenk(e.target.value)}
                required
              />
            </div>
            <div className="input4">
              <input
                type="text"
                placeholder="Fees"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                required
              />

              {/* <input
                type="text"
                placeholder="Cources"
                value={cources}
                onChange={(e) => setCources(e.target.value)}
                required
              /> */}
            </div>
            <div className="input5">
              <input
                type="text"
                placeholder="acceptedExams"
                value={acceptedExams}
                onChange={(e) => setAcceptedExams(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="average package"
                value={avgpkg}
                onChange={(e) => setAvgpkg(e.target.value)}
                required
              />
            </div>
            <div className="input6">
              <input
                type="number"
                placeholder="Highest package"
                value={highpkg}
                onChange={(e) => setHighpkg(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Cources details"
                value={courceDetails}
                onChange={(e) => setCourceDetails(e.target.value)}
                required
              />
            </div>
            <Courses options={cources} setOptions={setCources} />
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button  className="btn1" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Form;
