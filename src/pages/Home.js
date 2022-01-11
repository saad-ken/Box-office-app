import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";

const Home = () => {
  const [input, setInput] = useState("");

  const onInputChange = (ev) => {
    setInput(ev.target.value);
  };

  const OnSearch = () => {
    // https://api.tvmaze.com/search/shows?q=

    fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then((res) =>
      res.json().then((result) => {
        console.log(result);
      })
    );
  };

  const onKeydown = (ev) => {
    if (ev.keyCode === 13) {
      OnSearch();
    }
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onChange={onInputChange}
        value={input}
        onKeyDown={onKeydown}
      />
      <button type="button" onClick={OnSearch}>
        Search
      </button>
    </MainPageLayout>
  );
};

export default Home;
