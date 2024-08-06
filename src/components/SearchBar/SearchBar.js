import { useEffect, useState } from "react";
import s from "./style.module.css";
import { Search as SearchIcon } from "react-bootstrap-icons";

export function SearchBar({ onSubmit, noResultsMessage }) {
  const [query, setQuery] = useState("");

  //   Update query state when noResultsMessgae prop changes
  useEffect(() => {
    if (noResultsMessage) {
      setQuery(noResultsMessage);
    }
  }, [noResultsMessage]);

  function submit(e) {
    if (e.key === "Enter" && query.trim() !== "") {
      onSubmit(query);
      if (e.target.value && e.target.value.length > 0) {
        setQuery(""); // Reset the input value
      }
    }
  }

  return (
    <div className={s.container}>
      <SearchIcon size={27} className={s.icon} />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={submit}
        type="text"
        placeholder="Search like a bear: sniff out what you need..."
        className={`${s.input} ${noResultsMessage ? s.noResultsMessage : ""}`}
      />
    </div>
  );
}
