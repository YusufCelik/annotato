import { deriveAnnotationsFromSegments, serializeSegments } from ".";
import Annotation from "../types/Annotation";

jest.mock("./generateId");

const testText = "abcdef";

const annotations: Annotation[] = [
  {
    startOffset: 0,
    endOffset: 1,
    id: "a",
    labelId: "testlabel",
  },
  {
    startOffset: 2,
    endOffset: 3,
    id: "c",
    labelId: "testlabel",
  },
];

const segments = [
  {
    id: "a",
    annotated: true,
    annotationLabel: "testlabel",
    segmentText: "a",
  },
  { id: "mockedId", annotated: false, segmentText: "b" },
  {
    id: "c",
    annotated: true,
    annotationLabel: "testlabel",
    segmentText: "c",
  },
  { id: "mockedId", annotated: false, segmentText: "def" },
];

describe("Utilities", () => {
  test("deriveAnnotationsFromSegments", () => {
    expect(deriveAnnotationsFromSegments(segments)).toEqual(annotations);
  });

  test("serializeSegments", () => {
    const generateId = require("./generateId");
    generateId.default.mockImplementation(() => "mockedId");

    expect(serializeSegments(testText, annotations)).toEqual(segments);
  });
});
