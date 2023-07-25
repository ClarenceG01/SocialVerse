import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { RiDeleteBin7Line } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";

const DeleteAccount = () => {
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="delete-component">
      <div className="back">
        <ArrowBackIcon color="blue" onClick={goBack} />
      </div>
      <div className="delete-response">
        <p>Are you sure you want to delete your account?</p>
        <div className="user-response">
          <div className="accept-delete">
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
