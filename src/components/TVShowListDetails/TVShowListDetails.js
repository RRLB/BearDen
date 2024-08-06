import s from "./style.module.css";

export function TVShowListDetails({ tvShowListDetails, tvShowLanguages }) {
  //   console.log(tvShowListDetails);
  console.log(tvShowLanguages);
  if (tvShowListDetails) {
    const formatKey = (key) => {
      //replace _ with " "

      const replaced = key.replace(/_/g, " ");

      //capitalize first letters
      const capitalized = replaced.charAt(0).toUpperCase() + replaced.slice(1);
      //   console.log(capitalized);
      return capitalized;
    };

    // const formatLanguages
    // Function to format language codes
    // const formatLanguage = (code) => {
    //     <Languages lang={code} />
    //     return languageMap[code] || code.toUpperCase(); // Default to uppercase if not mapped
    // };

    const updateEntries = (entries, tvShowListDetails) => {
      // Use map to transform the entries array
      const updatedEntries = entries.map(([key, value]) => {
        // Check if the current key is "languages"
        if (key === "languages") {
          key = "Language";
          // Update the value to be the new tvShowListDetails (or a specific part of it)
          value = tvShowLanguages;
        }
        if (Array.isArray(value)) {
          value = value.join(", ");
          console.log("The value is an array.", value);
        }

        // Return the updated key-value pair
        return [key, value];
      });

      // Optionally, update your languages array or other state here if needed

      return { updatedEntries };
    };

    // Convert the object to entries array
    const entries = Object.entries(tvShowListDetails);
    // entries.forEach((item) => {
    //   item.forEach((value) => {
    //     console.log(value);
    //     if (value === "languages") {
    //       console.log("languages found");
    //     }
    //   });
    // });

    // Extract languages and get the filtered entries
    const { updatedEntries } = updateEntries(entries, tvShowListDetails);

    console.log(updatedEntries);

    // console.log(filteredEntries); // Entries without languages
    // console.log(languages); // ["en"]

    return (
      <div className={s.detailsBody}>
        <div className="row">
          {updatedEntries.map(([key, value], index) => (
            <div key={index} className="col-xs-12 col-sm-6 col-lg-4 col-xl-2">
              <span className={s.span}>
                {formatKey(key)}: {value + " "}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
