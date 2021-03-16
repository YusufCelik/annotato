import React from "react";
import { dummyText, dummyAnnotations, dummyLabels } from "./dummy";
import useAnnotato from "./hooks/useAnnotato";
import { AnnotatoModes } from "./types/AnnotatoMode";

function App() {
  const [Annotato, annotations] = useAnnotato({
    mode: AnnotatoModes.EDIT,
    text: dummyText,
    annotations: dummyAnnotations,
    labels: dummyLabels,
    onClick: (annotation, e) => console.log("CLICK", annotation, e),
    onMouseEnter: (annotation, e) => console.log("HOVER", annotation, e),
  });

  return (
    <div className="App">
      <div style={{ maxWidth: "50%", textAlign: "justify", margin: "0 auto" }}>
        <Annotato />
        <button
          onClick={() => {
            console.log(annotations);
          }}
        >
          Click
        </button>
      </div>
    </div>
  );
}

export default App;
