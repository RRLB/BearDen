import axios from "axios";
import { BASE_URL } from "../config";

export class TVShowAPI {
  //using static avoids having to call a constructio and initialise the class
  static async fetchPopular(handleError, setError) {
    try {
      const response = await axios.get(
        `${BASE_URL}tv/popular?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
      );
      // console.log(response.data.results);
      return response.data.results;
    } catch (error) {
      handleError(error, setError);
      return [];
    }
  }

  static async fetchRecommended(series_id, handleError, setError) {
    try {
      const response = await axios.get(
        `${BASE_URL}tv/${series_id}/recommendations?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
      );
      return response.data.results;
    } catch (error) {
      handleError(error, setError);
      return [];
    }
  }

  static async fetchByTitle(title, handleError, setError) {
    try {
      const response = await axios.get(
        `${BASE_URL}search/tv?api_key=${process.env.REACT_APP_API_KEY_PARAM}&querry=${title}`
      );
      return response.data.results;
    } catch (error) {
      handleError(error, setError);
      return [];
    }
  }
  static async fetchDetails(series_id, handleError, setError) {
    try {
      const response = await axios.get(
        `${BASE_URL}tv/${series_id}?api_key=${process.env.REACT_APP_API_KEY_PARAM}`
      );
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
