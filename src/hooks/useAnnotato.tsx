import React, { useEffect, useReducer } from "react";
import { annotatoReducer, Provider } from "../store/AnnotatoStore";
import DefaultUnselectButton from "../components/DefaultUnselectButton";
import LabelSelector from "../components/LabelSelector";
import AnnotatoView from "../components/View";

import "../style/annotato.css";
import DefaultRemoveAnnotationButton from "../components/DefaultRemoveAnnotationButton";
import Annotation from "../types/Annotation";
import AnnotationLabel from "../types/AnnotationLabel";
import { serializeSegments } from "../utils";
import { MouseStates } from "../types/MouseState";
import { AnnotatoModes } from "../types/AnnotatoMode";

interface IUseAnnotatoConfig {
  mode: AnnotatoModes | "edit" | "read";
  annotations?: Array<Annotation>;
  labels?: Array<AnnotationLabel>;
  text: string;
  unselectIcon?: React.ReactNode;
  removeAnnotationIcon?: React.ReactNode;
  onClick?: (
    annotation: Annotation,
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  onMouseEnter?: (
    annotation: Annotation,
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
}

const useAnnotato = (config: IUseAnnotatoConfig) => {
  const [state, dispatch] = useReducer(annotatoReducer, {
    annotations: config.annotations || [],
    labels: config.labels || [],
    text: config.text,
    segments: [],
    selectedLabel: "",
    event: {
      type: MouseStates.NONE,
      annotation: {} as Annotation,
      mouseEvent: {} as React.MouseEvent<HTMLElement, MouseEvent>,
    },
  });

  useEffect(() => {
    const segments = serializeSegments(state.text, state.annotations || []);

    dispatch({
      type: "update_segments",
      payload: segments,
    });
  }, [dispatch, state.text, state.annotations]);

  useEffect(() => {
    if (config.onClick && state.event.type === MouseStates.CLICK) {
      config.onClick(state.event.annotation, state.event.mouseEvent);
    }

    if (config.onMouseEnter && state.event.type === MouseStates.HOVER) {
      config.onMouseEnter(state.event.annotation, state.event.mouseEvent);
    }
  }, [config, state.event]);

  return [
    () => (
      <Provider value={{ state, dispatch }}>
        <section className={"annotato__container"}>
          {config.mode === AnnotatoModes.EDIT ? (
            <LabelSelector>
              {config.unselectIcon ? (
                config.unselectIcon
              ) : (
                <DefaultUnselectButton />
              )}
            </LabelSelector>
          ) : null}
          <AnnotatoView>
            {config.removeAnnotationIcon ? (
              config.removeAnnotationIcon
            ) : config.mode === AnnotatoModes.EDIT ? (
              <DefaultRemoveAnnotationButton />
            ) : null}
          </AnnotatoView>
        </section>
      </Provider>
    ),
    state.annotations,
  ] as const;
};

export default useAnnotato;
