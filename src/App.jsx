import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

function App() {
  const [catData, setCatData] = useState("");
  const [tresPalabras, setTresPalabras] = useState("");
  const [gif, setGif] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("https://catfact.ninja/fact");
      const data = await response.json();
      setCatData(data);

      const nuevaPalabra = data.fact.split(" ").slice(2, 5).join(" ");
      setTresPalabras(nuevaPalabra);
    } catch (error) {
      console.log("Hubo un error", error);
    }
  };

  const fetchGif = async (query) => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=sVX1jjiuSwrTZd1C1BVrKjn9NSKnV10G&q=${query}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
      );
      const data = await response.json();
      setGif(data);
    } catch (error) {
      console.log("Este es el error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (tresPalabras) {
      fetchGif(tresPalabras);
    }
  }, [tresPalabras]);

  return (
    <NextUIProvider>
      <div className="text-center">
        <h1 className="text-xl">Gif randoms 🧨</h1>
      </div>

      <div class="mt-8">
        <Card>
          <CardBody className="text-center">
            <p>
              <b>Checka</b> este dato random!
            </p>
            <br></br>
            <p>{catData.fact}</p>
          </CardBody>
        </Card>
      </div>
      <div className="mt-7 flex justify-center">
        {gif && gif.data && gif.data.length > 0 ? (
          <Image width={300} alt="GIF" src={gif.data[0].images.original.url} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </NextUIProvider>
  );
}

export default App;
