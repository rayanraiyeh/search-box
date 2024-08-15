import React, { useEffect, useState } from "react";
import "./SearchBox.css";

const SearchBox = () => {
  const [search, setSearch] = useState("");
  const [highlightedText, setHighlightedText] = useState([]);
  const [count, setCount] = useState(0);

  const text = `
What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
 when an unknown printer took a galley of type and scrambled it to make a type specimen book.
It has survived not only five centuries, but also the leap into electronic typesetting,
remaining essentially unchanged. 
It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content
of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
distribution of letters, as opposed to using 'Content here, content here', 
making it look like readable English. Many desktop publishing packages and web page
editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' 
will uncover many web sites still in their infancy. Various versions have evolved over the years,
sometimes by accident, sometimes on purpose (injected humour and the like).`;

  useEffect(() => {
    const highlighted = highlightText(text, search);
    setHighlightedText(highlighted);
    setCount(countHighlighted(text, search));
  }, [search, text]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleClear = () => {
    setSearch("");
  };

  const highlightText = (text, term) => {
    if (!term) return text;

    const parts = text?.split(new RegExp(`(${term})`, "gi"));
    return parts.map((item, index) => {
      const isHighlighted = item?.toLowerCase() === term.toLowerCase();
      return isHighlighted ? (
        <mark className="highlight" key={index}>
          {item}
        </mark>
      ) : (
        item
      );
    });
  };

  const countHighlighted = (text, term) => {
    if (!term) return 0;
    const regex = new RegExp(term, "gi");
    return (text.match(regex) || []).length;
  };

  return (
    <div className="container">
      <div className="search-container">
        <div className="clear-input-container">
          <input
            placeholder="Search..."
            type="text"
            value={search}
            onChange={handleChange}
            className="search-box"
          />
          {search && (
            <button
              className="clear-input-button"
              aria-label="Clear input"
              title="Clear input"
              onClick={handleClear}
            >
              ×
            </button>
          )}
        </div>

        <p
          style={{ visibility: search === "" && "hidden" }}
          className="count-text"
        >
          <b>{count} posts</b>
          &nbsp;were found.
        </p>
      </div>

      <p>{highlightedText}</p>
    </div>
  );
};

export default SearchBox;
