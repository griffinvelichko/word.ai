import { useEffect, useState } from "react";

function useIsWordValid(word) {
  const [isValid, setIsValid] = useState(false);
  const url = `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "852a0bf287msh35306414a8a738ep1325c2jsna7d441449ad7",
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    fetch(url, options)
      .then((data) => data.json())
      .then((data) => {
        if (data.definitions.length !== 0) {
          console.log({ data });
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsValid(false);
      });
  }, [word]);

  return isValid;
}

export default useIsWordValid;
