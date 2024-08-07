import axios from "axios";
import { LANGAPIURL, LANGAPIKEY } from "../config";

export class Languages {
  static async fetchLanguages(languageCode, handleError, setError) {
    console.log(languageCode);
    try {
      if (languageCode) {
        const optionsLanguages = {
          method: "GET",
          url: `https://list-of-all-countries-and-languages-with-their-codes.p.rapidapi.com/languages`,
          headers: {
            "x-rapidapi-key":
              "aaddbdb319msh11b98b43c686294p118295jsn8fe18eec4536",
            "x-rapidapi-host":
              "list-of-all-countries-and-languages-with-their-codes.p.rapidapi.com",
          },
        };

        const response = await axios.request(optionsLanguages);

        const getLanguageNames = (codes, languages) => {
          return codes.map((code) => {
            const language = languages.find((lang) => lang.code === code);
            return language.name;
          });
        };

        const languageNames = getLanguageNames(languageCode, response.data);

        return languageNames;
      }
    } catch (error) {
      handleError(error, setError);
      return [];
    }
  }
}
