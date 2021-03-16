export enum MouseStates {
  NONE,
  CLICK,
  HOVER,
}

type MouseState = MouseStates.NONE | MouseStates.CLICK | MouseStates.HOVER;

export default MouseState;
