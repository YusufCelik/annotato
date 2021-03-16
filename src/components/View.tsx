import React, { useContext } from "react";

import { AnnotatoContext } from "../store/AnnotatoStore";
import Annotation from "../types/Annotation";
import { MouseStates } from "../types/MouseState";

interface IAnnotatoViewProps {
  children: React.ReactNode;
}

const AnnotatoView: React.FC<IAnnotatoViewProps> = ({ children }) => {
  const { state, dispatch } = useContext(AnnotatoContext);

  const renderSegments = () => {
    return state.segments.map((segment, segmentId) => {
      if (segment.annotated) {
        const label = state.labels.find(
          (label) => label.id === segment.annotationLabel
        );

        return (
          <mark
            className={"annotato__view__mark"}
            key={Date.now() + segmentId}
            style={{
              backgroundColor: label ? label.color : "",
            }}
            onClick={(event) => {
              const selection = window.getSelection();

              if (selection && selection?.rangeCount === 0) {
                dispatch({
                  type: "update_event",
                  payload: {
                    type: MouseStates.CLICK,
                    mouseEvent: event,
                    annotation: state.annotations.find(
                      (annotation) => annotation.id === segment.id
                    ) as Annotation,
                  },
                });
              }
            }}
            onMouseEnter={(event) => {
              const selection = window.getSelection();

              if (selection && selection?.rangeCount === 0) {
                dispatch({
                  type: "update_event",
                  payload: {
                    type: MouseStates.HOVER,
                    mouseEvent: event,
                    annotation: state.annotations.find(
                      (annotation) => annotation.id === segment.id
                    ) as Annotation,
                  },
                });
              }
            }}
          >
            {segment.segmentText}
            {children ? (
              <button
                className={"annotato__view__mark__button"}
                onClick={() => {
                  const annotation = state.annotations.find(
                    (annotation) => annotation.id === segment.id
                  );

                  dispatch({
                    type: "remove_annotation",
                    payload: annotation?.id || "",
                  });
                }}
              >
                {children}
              </button>
            ) : null}
          </mark>
        );
      }

      return (
        <span
          className={"annotato__view__unmarked"}
          key={Date.now() + segmentId}
          data-id={segmentId}
        >
          {segment.segmentText}
        </span>
      );
    });
  };

  return (
    <>
      <section className={"annotato__view__container"}>
        <p className={"annotato__view__text-container"}>{renderSegments()}</p>
      </section>
    </>
  );
};

export default AnnotatoView;
