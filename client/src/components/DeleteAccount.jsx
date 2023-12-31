import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { RiDeleteBin7Line } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const goBack = () => {
    window.history.back();
  };
  const deleteAccount = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/deleteaccount",
        {
          withCredentials: true,
        }
      );
      toast.success("Account deleted");
      navigate("/land/login");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="delete-component">
      <div className="back">
        <ArrowBackIcon color="blue" onClick={goBack} />
      </div>
      <div className="delete-response">
        <p>Are you sure you want to delete your account?</p>
        <div className="user-response">
          <div className="accept-delete" onClick={deleteAccount}>
            <RiDeleteBin7Line color="white" />
            <span>Yes</span>
          </div>
          <div className="reject-delete">
            <GiCancel color="green" />
            <span>No</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
