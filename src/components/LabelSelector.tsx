import React, { useContext } from "react";
import { AnnotatoContext } from "../store/AnnotatoStore";
import Segment from "../types/Segment";
import { deriveAnnotationsFromSegments } from "../utils";
import generateId from "../utils/generateId";

const LabelSelector = () => {
  const { state, dispatch } = useContext(AnnotatoContext);

  const generateSegments = (
    startOffset: number,
    endOffset: number,
    segmentText: string,
    labelId: string
  ) => {
    const splitLines: Segment[] = [];

    if (startOffset === 0) {
      splitLines.push({
        id: generateId(),
        annotated: true,
        annotationLabel: labelId,
        segmentText: segmentText.slice(startOffset, endOffset),
      });

      splitLines.push({
        id: generateId(),
        annotated: false,
        segmentText: segmentText.slice(endOffset, segmentText.length),
      });
    } else if (endOffset === segmentText.length) {
      splitLines.push({
        id: generateId(),
        annotated: false,
        segmentText: segmentText.slice(0, startOffset),
      });

      splitLines.push({
        id: generateId(),
        annotated: true,
        annotationLabel: labelId,
        segmentText: segmentText.slice(startOffset, endOffset),
      });
    } else {
      splitLines.push({
        id: generateId(),
        annotated: false,
        segmentText: segmentText.slice(0, startOffset),
      });

      splitLines.push({
        id: generateId(),
        annotated: true,
        annotationLabel: labelId,
        segmentText: segmentText.slice(startOffset, endOffset),
      });

      splitLines.push({
        id: generateId(),
        annotated: false,
        segmentText: segmentText.slice(endOffset, segmentText.length),
      });
    }

    return splitLines;
  };

  const getTruncatedSelection = (
    selectionContent: string,
    selectionRange: Range
  ): {
    startOffset: number;
    endOffset: number;
  } => {
    let startOffset = selectionRange.startOffset;
    let endOffset = selectionRange.endOffset;

    if (selectionContent[0] === " ") {
      startOffset = startOffset + 1;
    }

    if (selectionContent[selectionContent.length - 1] === " ") {
      endOffset = endOffset - 1;
    }

    return {
      startOffset,
      endOffset,
    };
  };

  const updateSegments = (segmentId: number, annotationLabel: string) => {
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const selectionContent = selection.toString();
      const { startOffset, endOffset } = getTruncatedSelection(
        selectionContent,
        selection?.getRangeAt(0) as Range
      );

      if (selectionContent !== " ") {
        if (startOffset !== endOffset) {
          const splitLines = generateSegments(
            startOffset,
            endOffset,
            state.segments[segmentId].segmentText,
            annotationLabel
          );

          let segments: Segment[] = [];

          if (state.segments.length === 1) {
            segments = splitLines;
          }

          if (state.segments.length > 1) {
            if (segmentId + 1 === state.segments.length) {
              segments = [...state.segments.slice(0, segmentId), ...splitLines];
            } else {
              segments = [
                ...state.segments.slice(0, segmentId),
                ...splitLines,
                ...state.segments.slice(segmentId + 1, state.segments.length),
              ];
            }
          }

          const annotations = deriveAnnotationsFromSegments(segments);

          dispatch({
            type: "update_annotations",
            payload: annotations,
          });
        }
      }
    }
  };

  return (
    <ul className={"annotato__label-selector__container"}>
      {state.labels.map((label) => {
        const isSelected = label.id === state.selectedLabel;

        return (
          <li
            key={label.id}
            className={"annotato__label-selector__label-container"}
            style={{
              backgroundColor: label.color,
            }}
          >
            <button
              onClick={() => {
                const segmentId = parseInt(
                  window.getSelection()?.anchorNode?.parentElement?.dataset[
                    "id"
                  ] || "0"
                );

                updateSegments(segmentId, label.id);

                window.getSelection()?.empty();
              }}
              className={`annotato__label-selector__label ${
                isSelected ? "annotato__label-selector__label--selected" : ""
              }`}
            >
              {label.id}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default LabelSelector;
