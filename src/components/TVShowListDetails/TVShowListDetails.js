import s from "./style.module.css";

export function TVShowListDetails({ tvShowListDetails, tvShowLanguages }) {
  if (tvShowListDetails) {
    const formatKey = (key) => {
      //replace _ with " "
      const replaced = key.replace(/_/g, " ");
      //capitalize first letters
      const capitalized = replaced.charAt(0).toUpperCase() + replaced.slice(1);
      //   console.log(capitalized);
      return capitalized;
    };

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
        }

        // Return the updated key-value pair
        return [key, value];
      });

      // Optionally, update your languages array or other state here if needed

      return { updatedEntries };
    };

    // Convert the object to entries array
    const entries = Object.entries(tvShowListDetails);

    // Extract languages and get the filtered entries
    const { updatedEntries } = updateEntries(entries, tvShowListDetails);

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
