import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tvShows";
import { Languages } from "./api/languagesApi";
// import style from "./styles.modules.css";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetails } from "./components/TVShowDetails/TVShowDetails";
import { Logo } from "./components/Logo/logo";
import logo from "./assets/pictures/bear-13-512.png";
import { TVShowListItem } from "./components/TVShowListItem/TVShowListItem";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { SearchBar } from "./components/SearchBar/SearchBar";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { ErrorMessage } from "./components/ErrorMessage/ErrorMessage";
import { TVShowListDetails } from "./components/TVShowListDetails/TVShowListDetails";

// TVShowAPI.fetchRecommended(1402);//test to call componenet, then function, to which i pass the params tv show id that returns recomendations based on the id
export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  //create state to stroe tv show recomendations that can then be passed to the tvshowlistitemdetails component
  const [recomendedShowsList, setRecommendedShowsList] = useState([]); //add empty array as default as it will be a list
  //create state to store tv show details that can then be passed to the tvshowlistitem component
  const [showsListDetails, setShowsListDetails] = useState([]); //add empty array as default as it will be a list
  //error messages
  const [error, setError] = useState("");
  //Message response to search bar
  const [noResultsMessage, setNoResultsMessage] = useState(""); // State for no results message
  //set languages
  const [languages, setLanguages] = useState("");

  const handleError = (error, setError) => {
    setError("Error whilst pawing at things, the system may be out of honey!");
    console.error(error);
  };
  //cannot call an asyinc function in use effect, so need to move it out of useEffect, then call it from inside :
  async function fetchPopular() {
    try {
      const popular = await TVShowAPI.fetchPopular(handleError, setError);
      if (popular && popular.length > 0) {
        setCurrentTVShow(popular[0]);
        setError(""); // Clear any existing error
      }
    } catch (error) {
      handleError(error, setError);
    }
  }

  async function fetchRecommended(tvShowId) {
    try {
      const recommended = await TVShowAPI.fetchRecommended(
        tvShowId,
        handleError,
        setError
      );
      if (recommended && recommended.length > 0) {
        setRecommendedShowsList(recommended.slice(0, 10)); //slice cuts the array to recouperate the first 10 elements
        setError(""); // Clear any existing error
      }
    } catch (error) {
      handleError(error, setError);
    }
  }

  async function fetchDetails(tvShowId) {
    try {
      const details = await TVShowAPI.fetchDetails(
        tvShowId,
        handleError,
        setError
      );
      //Check Object exists and it has properties
      if (details && Object.keys(details).length > 0) {
        // console.log(details);
        setShowsListDetails(details);
        setError(""); // Clear any existing error
      }
    } catch (error) {
      handleError(error, setError);
    }
  }

  async function fetchLanguages(languageCode) {
    try {
      const language = await Languages.fetchLanguages(
        languageCode,
        handleError,
        setError
      );
      if (language && language.length > 0) {
        setLanguages(language[0]);
        setNoResultsMessage(""); // Clear no results message
        setError(""); // Clear any existing error
      }
    } catch (error) {
      handleError(error, setError);
    }
  }

  useEffect(() => {
    fetchPopular();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommended(currentTVShow.id);
    }
  }, [currentTVShow]);

  useEffect(() => {
    if (currentTVShow) {
      fetchDetails(currentTVShow.id);
    }
  }, [currentTVShow]);

  useEffect(() => {
    if (showsListDetails) {
      fetchLanguages(showsListDetails.languages);
    }
  }, [showsListDetails]);

  function setCurrentTvShowFromRecomendations(tvShow) {
    alert(JSON.stringify(tvShow));
  }

  async function searchTVShow(tvShowName) {
    try {
      const searchResponse = await TVShowAPI.fetchByTitle(
        tvShowName,
        handleError,
        setError
      );
      if (searchResponse && searchResponse.length > 0) {
        setCurrentTVShow(searchResponse[0]);
        setNoResultsMessage(""); // Clear no results message
        setError(""); // Clear any existing error
      } else {
        setNoResultsMessage("The Bear has gone fishing, but came up empty");
      }
    } catch (error) {
      handleError(error, setError);
    }
  }

  return (
    <ErrorBoundary>
      <div
        className={s.main_container}
        style={{
          background: currentTVShow
            ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${
                currentTVShow.backdrop_path
                  ? BACKDROP_BASE_URL + currentTVShow.backdrop_path
                  : "https://picsum.photos/1920/1080"
              }") no-repeat center / cover`
            : "black",
        }}
      >
        <div className={s.header}>
          <div className="row">
            <div className="col-4" style={{ marginBottom: "25px" }}>
              <Logo
                title="The Bear's Den"
                image={logo}
                subtitle="Paws for a Moment: "
                miniSubtitle="Your next favorite show is just a bear away."
              />
            </div>

            <div className="col-md-10 col-lg-6" style={{ marginTop: "10px" }}>
              <SearchBar
                onSubmit={searchTVShow}
                noResultsMessage={noResultsMessage}
              />
            </div>
          </div>
          {/* Display the error message if it exists */}
          {error && <ErrorMessage message={error} />}
        </div>

        <div className={s.tv_show_details}>
          {
            currentTVShow && (
              <TVShowDetails tvShow={currentTVShow} />
            ) /* //check its not undefined */
          }
        </div>

        <div className={s.details_shows}>
          {showsListDetails && (
            <TVShowListDetails
              tvShowListDetails={showsListDetails}
              tvShowLanguages={languages}
            />
          )}
        </div>

        <div className={s.recomended_shows}>
          {
            recomendedShowsList && recomendedShowsList.length > 0 && (
              <TVShowList
                onClickItem={setCurrentTVShow}
                tvShowList={recomendedShowsList}
              />
            ) /* //check its not undefined */
          }
        </div>
      </div>
    </ErrorBoundary>
  );
}
