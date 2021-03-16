import React from "react";
import AnnotationLabel from "../types/AnnotationLabel";
import Annotation from "../types/Annotation";
import Segment from "../types/Segment";
import { MouseStates } from "../types/MouseState";

export type AnnotatoReducerState = {
  annotations: Array<Annotation>;
  labels: Array<AnnotationLabel>;
  segments: Array<Segment>;
  selectedLabel: string;
  text: string;
  event: {
    annotation: Annotation;
    type: MouseStates;
    mouseEvent: React.MouseEvent<HTMLElement, MouseEvent>;
  };
};

type AnnotatoAction =
  | {
      type: "update_segments";
      payload: Array<Segment>;
    }
  | {
      type: "update_selected_label";
      selectedLabel: string;
    }
  | {
      type: "update_annotations";
      payload: Array<Annotation>;
    }
  | {
      type: "remove_annotation";
      payload: string;
    }
  | {
      type: "update_event";
      payload: {
        type: MouseStates;
        annotation: Annotation;
        mouseEvent: React.MouseEvent<HTMLElement, MouseEvent>;
      };
    };

export const annotatoReducer = (
  state: AnnotatoReducerState,
  action: AnnotatoAction
): AnnotatoReducerState => {
  switch (action.type) {
    case "update_segments":
      return {
        ...state,
        segments: action.payload,
      };
    case "update_selected_label":
      return {
        ...state,
        selectedLabel: action.selectedLabel,
      };
    case "update_annotations":
      return {
        ...state,
        annotations: action.payload,
      };
    case "remove_annotation":
      return {
        ...state,
        annotations: state.annotations.filter(
          (annotation) => annotation.id !== action.payload
        ),
      };

    case "update_event": {
      return {
        ...state,
        event: action.payload,
      };
    }
  }
};

export interface IAnnotateContextProps {
  state: AnnotatoReducerState;
  dispatch: React.Dispatch<AnnotatoAction>;
}

export const initialState = {
  annotations: [],
  labels: [],
  selectedLabel: "",
  segments: [],
  text: "",
  event: {
    type: MouseStates.NONE,
    mouseEvent: {} as React.MouseEvent<HTMLElement, MouseEvent>,
    annotation: {
      id: "",
      startOffset: 0,
      endOffset: 0,
      labelId: "",
    },
  },
};

export const AnnotatoContext = React.createContext<IAnnotateContextProps>({
  state: initialState,
  dispatch: () => null,
});

export const { Provider } = AnnotatoContext;
