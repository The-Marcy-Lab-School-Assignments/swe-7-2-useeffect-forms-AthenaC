/* 
This component is meant to display gifs. However, there are two different sets of gifs that this component can display, depending on the user's actions. At first, they should see trending gifs but after submitting a search term in the GifSearch form, they should see gifs related to their search.

TODO:
- use the getTrendingGifs adapter to fetch trending gifs on the first render
- each time the user submits the form in GifSearch, use the getGifsBySearch adapter to fetch gifs according to the search term.
- render the list of fetched gifs (or the defaultGifs) as list items with an `img` inside. Remember to give each list item a unique key!
- Bonus: if at any point an error is returned, render the default gifs again.
*/
import { useState, useEffect } from "react";
import defaultGifs from "../gifs.json";
import { getGifsBySearch, getTrendingGifs } from "../adapters/giphyAdapters";

const GifContainer = () => {
  const [gifs, setGifs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      const [data, error] = await getTrendingGifs();
      if (error) console.error(error);
      setError("Failed to load gifs");
      if (data) setGifs(data);
    };
    fetchTrending();
  }, []);

  return (
    <ul>
      {gifs.map((gif) => (
        <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
      ))}
    </ul>
  );
};

export default GifContainer;
