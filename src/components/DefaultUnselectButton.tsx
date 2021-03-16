import React from "react";

const DefaultUnselectButton = () => {
  return (
    <svg height="16" width="16" viewBox="0 0 20 20">
      <path
        className={"annotato__label-selector__unselect-icon"}
        d="M16 2h-12c-1.1 0-2 0.9-2 2v12c0 1.1 0.9 2 2 2h12c1.1 0 2-0.9 2-2v-12c0-1.1-0.9-2-2-2zM13.061 14.789l-3.061-3.060-3.061 3.060-1.729-1.728 3.061-3.061-3.060-3.061 1.729-1.729 3.060 3.061 3.059-3.061 1.729 1.729-3.059 3.061 3.060 3.061-1.728 1.728z"
      ></path>
    </svg>
  );
};

export default DefaultUnselectButton;
