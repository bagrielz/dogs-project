import React from "react";

// O hook useMedia() tem o objetivo de mudar o valor de matches para "true" ou "false", dependendo do valor de media que for passado.
const useMedia = (media) => {
  const [match, setMatch] = React.useState(null);

  React.useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    }
    changeMatch();

    window.addEventListener("resize", changeMatch);
    return () => {
      window.removeEventListener("resize", changeMatch);
    };
  }, [media]);

  return match;
};

export default useMedia;
