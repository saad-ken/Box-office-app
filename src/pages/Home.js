import React, { useCallback, useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import CustomRadio from "../components/CustomRadio";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { apiGET } from "../misc/config";
import { useLastQuery } from "../misc/custom-hooks";
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from "./Home.styled";

const renderResults = (results) => {
  if (results && results.length === 0) {
    return <div>No results</div>;
  }
  if (results && results.length > 0) {
    return results[0].show ? (
      <ShowGrid data={results} />
    ) : (
      <ActorGrid data={results} />
    );
  }
  return null;
};

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");

  const isShowsSearch = searchOption === "shows";

  const onInputChange = useCallback(
    (ev) => {
      setInput(ev.target.value);
    },
    [setInput]
  );

  const OnSearch = () => {
    apiGET(`/search/${searchOption}?q=${input}`).then((reult) => {
      setResults(reult);
    });
  };

  const onKeydown = (ev) => {
    if (ev.keyCode === 13) {
      OnSearch();
    }
  };

  const OnRadioChange = useCallback((ev) => {
    setSearchOption(ev.target.value);
  }, []);

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        value={input}
        onKeyDown={onKeydown}
      />

      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="show-search"
            value="shows"
            checked={isShowsSearch}
            onChange={OnRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="actor-search"
            value="people"
            checked={!isShowsSearch}
            onChange={OnRadioChange}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
        <button type="button" onClick={OnSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults(results)}
    </MainPageLayout>
  );
};

export default Home;
