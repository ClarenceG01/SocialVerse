import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button } from "@material-ui/core";

const Extra = () => {
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
      console.log(response);
    } catch (error) {}
  };
  useEffect(() => {
    getFollowSuggestions();
  }, []);
  return (
    <div className="Extra-component">
      <div className="searchInputWrapper">
        <input
          className="searchInput"
          type="search"
          placeholder="Search for a user"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="search-results">
        {searchResults.lenght === 0 ? (
          <div className="searched-user">
            <h1>Search</h1>
          </div>
        ) : (
          searchResults.map((account) => {
            return (
              <div className="searched-user">
                <h1>Search</h1>
                <div className="searched-user">
                  <div className="suggested-user-details">
                    <Avatar src={account.profile_picture} />
                    <div className="details">
                      <p>@{account.username}</p>
                      <p>{account.full_name}</p>
                    </div>
                  </div>
                </div>
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
                    <p>@{account.username}</p>
                    <p>{account.full_name}</p>
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
