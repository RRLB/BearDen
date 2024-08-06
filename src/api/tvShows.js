import axios from "axios";
import { BASE_URL, API_KEY_Popular } from "../config";

const optionsPopular = {
  method: "GET",
  url: `${BASE_URL}tv/popular`,
  params: { include_adult: "true", language: "en-US", page: "1" },
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY_Popular}`,
  },
};

export class TVShowAPI {
  //using static avoids having to call a constructio and initialise the class
  static async fetchPopular(handleError, setError) {
    try {
      const response = await axios.request(optionsPopular);
      // console.log(response.data.results);
      return response.data.results;
    } catch (error) {
      handleError(error, setError);
      return [];
    }
  }

  static async fetchRecommended(series_id, handleError, setError) {
    try {
      const optionsRecommneded = {
        method: "GET",
        url: `${BASE_URL}tv/${series_id}/recommendations`,
        params: { include_adult: "true", language: "en-US", page: "1" },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY_Popular}`,
        },
      };
      const response = await axios.request(optionsRecommneded);
      return response.data.results;
    } catch (error) {
      handleError(error, setError);
      return [];
    }
  }

  static async fetchByTitle(title, handleError, setError) {
    try {
      const optionsSearch = {
        method: "GET",
        url: `${BASE_URL}search/tv`,
        params: {
          query: `${title}`,
          include_adult: "true",
          language: "en-US",
          page: "1",
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY_Popular}`,
        },
      };
      const response = await axios.request(optionsSearch);
      return response.data.results;
    } catch (error) {
      handleError(error, setError);
      return [];
    }
  }
  static async fetchDetails(series_id, handleError, setError) {
    // console.log(series_id);
    try {
      const optionsDetails = {
        method: "GET",
        url: `${BASE_URL}tv/${series_id}`,
        params: { language: "en-US" },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY_Popular}`,
        },
      };
      const response = await axios.request(optionsDetails);

      const detailsResults = {
        created_by: response.data.created_by.map((creator) => creator.name),
        genres: response.data.genres.map((genre) => genre.name),
        languages: response.data.languages,
        number_of_seasons: response.data.number_of_seasons,
        number_of_episodes: response.data.number_of_episodes,
        origin_country: response.data.origin_country,
        first_air_date: response.data.first_air_date,
        last_air_date: response.data.last_air_date,
        status: response.data.status,
      };
      // console.log(detailsResults);
      return detailsResults;
    } catch (error) {
      handleError(error, setError);
      return [];
    }
  }
}
