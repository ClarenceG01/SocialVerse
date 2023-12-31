import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Extra = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [followSuggestions, setFollowSuggestions] = useState([]);
  const getFollowSuggestions = async () => {
    const response = await axios.get(
      "http://localhost:5050/accountsnotfollowed",
      { withCredentials: true }
    );
    setFollowSuggestions(response.data.results);
  };
  console.log(`searchTerm`, searchTerm);
  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    console.log(`after` + searchTerm);
    try {
      if (searchTerm === "") {
        setSearchResults([]);
      }
      const response = await axios.get(
        `http://localhost:5050/search/${searchTerm}`,
        {
          withCredentials: true,
        }
      );
      setSearchResults(response.data.results);
      console.log(searchResults);
    } catch (error) {
      console.error(error);
    }
  };
  const handleFollow = async (user_id) => {
    try {
      const response = await axios.get(
        `http://localhost:5050/followuser/${user_id}`,
        {
          withCredentials: true,
        }
      );
      const message = response.data.message;
      if (message === "User followed") {
        toast.success("User followed");
        refreshFeed();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFollowSuggestions();
  }, []);
  const refreshFeed = () => {
    getFollowSuggestions();
  };
  return (
    <div className="Extra-component">
      <div className="searchInputWrapper">
        <input
          className="searchInput"
          type="search"
          placeholder="Search user"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="search-results">
        {searchResults.lenght === 0 ? (
          <div className="searched-user">
            <span className="no-results">Search</span>
          </div>
        ) : (
          searchResults.map((account) => {
            return (
              <div className="searched-user">
                <div className="suggested-user-details">
                  <Avatar className="search-dp" src={account.profile_picture} />
                  <div className="details">
                    <p>{account.full_name}</p>
                    <p>@{account.username}</p>
                  </div>
                </div>
                <Button
                  className="follow-button"
                  variant="contained"
                  size="small"
                  onClick={() => handleFollow(account.user_id)}
                >
                  Follow
                </Button>
              </div>
            );
          })
        )}
      </div>
      <div className="suggested-accounts">
        <p className="suggested-title">Suggested Follows</p>
        {followSuggestions.map((account) => {
          return (
            <div>
              <div className="suggested-user">
                <div className="suggested-user-details">
                  <Avatar src={account.profile_picture} alt="User dp" />
                  <div className="details">
                    <p>{account.full_name}</p>
                    <p>@{account.username}</p>
                  </div>
                </div>
                <Button
                  className="follow-button"
                  variant="contained"
                  size="small"
                  onClick={() => handleFollow(account.user_id)}
                >
                  Follow
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Extra;
