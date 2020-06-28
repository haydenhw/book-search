import React, {useState, useEffect} from "react";
import "./style.css";

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  };
};

function SearchForm(props){
  const { value:searchQuery, bind:bindSearchQuery, reset:resetSearchQuery } = useInput('The Stand');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSubmit(searchQuery)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Search Books:
        <input type="text" {...bindSearchQuery} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

function BookResults(props) {
  if (props.items.length > 0) {
    const items = props.items.map(item => {
      return <li>{item.volumeInfo.title}</li>
    })

    return (
      <ul>{items}</ul>
    )
  }
  return <div></div>
}

function App(props) {
  const [apiData, setApiData ] = useState({items: []});

  const searchForBook = async (searchQuery) => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=AIzaSyBm_1UFH526NIVhGaq3M7adoz-4RdxK6eE`
    );
    const json = await res.json();
    setApiData(json)
  }

  return (
    <div>
      <SearchForm onSubmit={searchForBook}/>
      <BookResults items={apiData.items}/>
    </div>
  );
}

export default App;
