# Annotato

![alt text]('./public/images/preview.png' "Preview picture")

Annotato is a React component that helps to annotate or merely display previously made annotations in a given text. All edits, and thus new annotations, are stored in the component state that can be acquired via the useAnnotato hook.

There are two distinct modes in Annotato: read and edit. The read mode allows for prior stored annotations to appear in a given text without edit functionality. The edit mode, however, does display an additional label selector toolbar and allows for new annotations to be made as well as previous annotations to be removed. New annotations are made by highlighting some text and then clicking on the desired label in the label toolbar.

Both modes support custom onClick and onHover events to be attached to the annotations.

## Install

```npm install --save annotato```

## Getting Started

```js
import React from 'react';
import useAnnotato from 'annotato/hooks/useAnnotato';

const dummyText = "This is a text that will be annotated.";

const dummyAnnotations = [{
    id: "someId",
    labelId: "test",
    startOffset: 0,
    endOffset: 4
}];

const dummyLabels = [
  {
    id: "test",
    color: "#444999",
  }
];

function View() {
  const [Annotato, annotations] = useAnnotato({
    mode: "edit",
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
```

## API

