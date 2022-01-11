import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { apiGET } from "../misc/config";

const Home = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");

  const isShowsSearch = searchOption === "shows";

  const onInputChange = (ev) => {
    setInput(ev.target.value);
  };

  const OnSearch = () => {
    // https://api.tvmaze.com/search/shows?q=
    apiGET(`/search/${searchOption}?q=${input}`).then((reult) => {
      setResults(reult);
    });
  };

  const onKeydown = (ev) => {
    if (ev.keyCode === 13) {
      OnSearch();
    }
  };

  const OnRadioChange = (ev) => {
    setSearchOption(ev.target.value);
  };

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }
    if (results && results.length > 0) {
      return results[0].show
        ? results.map((items) => (
            <div key={items.show.id}> {items.show.name} </div>
          ))
        : results.map((items) => (
            <div key={items.person.id}> {items.person.name} </div>
          ));
    }
    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        value={input}
        onKeyDown={onKeydown}
      />
      <div>
        <label htmlFor="show-search">
          Shows
          <input
            id="show-search"
            type="radio"
            value="shows"
            checked={isShowsSearch}
            onChange={OnRadioChange}
          />
        </label>

        <label htmlFor="actor-search">
          Actors
          <input
            id="actor-search"
            type="radio"
            value="people"
            checked={!isShowsSearch}
            onChange={OnRadioChange}
          />
        </label>
      </div>

      <button type="button" onClick={OnSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
