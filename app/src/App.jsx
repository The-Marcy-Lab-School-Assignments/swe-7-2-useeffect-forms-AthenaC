/* 
GifSearch is a controlled form that sets a search term to find gifs
GifContainer must take the search term and then fetch gifs according from the search/ endpoint

TODO:
- Share the searchTerm state set by the GifSearch form with the GifContainer
*/

import NavBar from "./components/NavBar";
import GifContainer from "./components/GifContainer";
import GifSearch from "./components/GifSearch";
import { getGifsBySearch, getTrendingGifs } from "./adapters/giphyAdapters";
import { useState, useEffect } from "react";
import defaultGifs from "./gifs.json";

const App = () => {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [err, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      const [data, error] = await getTrendingGifs();
      if (error) {
        console.error(err);
        setError("Failed to load gifs");
      }
      if (data) setGifs(data);
    };
    fetchTrending();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setGifs(defaultGifs.slice(0, 3)); // Use first 3 default GIFs when search is empty
      setError(null);
      return;
    }

    const [data, error] = await getGifsBySearch(searchTerm);

    if (error) {
      setError("Failed to get results");
      setGifs(defaultGifs.slice(0, 3));
    }

    if (data) {
      setGifs(data);
      setError(null);
    }
  };

  return (
    <div>
      <NavBar color="black" title="Giphy Search" />
      <div className="ui container">
        <GifSearch
          onSubmit={handleSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <br />

        <GifContainer gifs={gifs} />
      </div>
    </div>
  );
};

export default App;
