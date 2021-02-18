import { createContext, useState, useEffect, useContext } from "react";
import { mockUser } from "./mockData/mockUser";
import { mockRepos } from "./mockData/mockRepos";
import { mockFollowers } from "./mockData/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

export const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  // request loading
  const [numberOfRequests, setNumberOfRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // error
  const [error, setError] = useState({ show: false, msg: "" });

  const searchGithubUser = async (user) => {
    toggleError();
    setIsLoading(true);
    const response = await axios
      .get(`${rootUrl}/users/${user}`)
      .catch((err) => console.log(err));
    if (response) {
      const { repos_url, followers_url } = response.data;

      await Promise.allSettled([
        axios.get(`${repos_url}?per_page=100`),
        axios.get(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = "fulfilled";
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
          setGithubUser(response.data);
        })
        .catch((err) => console.log(err));
    } else {
      toggleError(true, "there is no user with that username");
    }
    checkRequests();
    setIsLoading(false);
  };

  //  check rate
  const checkRequests = () => {
    axios
      .get(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;

        setNumberOfRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "sorry, you have exceeded your hourly rate limit!");
        }
      })
      .catch((err) => console.log(err));
  };
  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }
  // error
  useEffect(checkRequests, []);

  useEffect(() => {
    searchGithubUser("PrakharJain05");
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        numberOfRequests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export const UseGithubContext = () => useContext(GithubContext);
