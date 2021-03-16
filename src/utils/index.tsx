import Annotation from "../types/Annotation";
import Segment from "../types/Segment";
import SegmentRange from "../types/SegmentRange";
import generateId from "./generateId";

export const serializeSegments = (
  text: string,
  annotations: Array<Annotation>
) => {
  if (annotations.length === 0) {
    return [
      {
        id: generateId(),
        annotated: false,
        segmentText: text.slice(0, text.length),
      },
    ];
  }

  let annotationRanges: Array<SegmentRange> = annotations.map((annotation) => {
    return {
      id: annotation.id,
      startOffset: annotation.startOffset,
      endOffset: annotation.endOffset,
      annotated: true,
      annotationLabel: annotation.labelId,
    };
  });

  const allRanges: Array<SegmentRange> = [];

  if (annotationRanges[0].startOffset > 0) {
    annotationRanges = [
      {
        id: generateId(),
        startOffset: 0,
        endOffset: annotationRanges[0].startOffset,
        annotated: false,
      },
      ...annotationRanges,
    ];
  }

  if (annotationRanges[annotationRanges.length - 1].endOffset < text.length) {
    annotationRanges = [
      ...annotationRanges,
      {
        id: generateId(),
        startOffset: annotationRanges[annotationRanges.length - 1].endOffset,
        endOffset: text.length,
        annotated: false,
      },
    ];
  }

  annotationRanges.map((range, rangeIndex) => {
    allRanges.push(range);
    if (rangeIndex < annotationRanges.length - 1) {
      if (annotationRanges[rangeIndex + 1].startOffset !== range.endOffset) {
        allRanges.push({
          id: generateId(),
          startOffset: range.endOffset,
          endOffset: annotationRanges[rangeIndex + 1].startOffset,
          annotated: false,
        });
      }
    }

    return range;
  });

  const segments: Array<Segment> = allRanges.map((entry: SegmentRange) => {
    if (entry.annotationLabel) {
      return {
        id: entry.id,
        annotated: entry.annotated,
        annotationLabel: entry.annotationLabel,
        segmentText: text.slice(entry.startOffset, entry.endOffset),
      };
    }

    return {
      id: entry.id,
      annotated: entry.annotated,
      segmentText: text.slice(entry.startOffset, entry.endOffset),
    };
  });

  return segments;
};

export const deriveAnnotationsFromSegments = (segments: Segment[]) => {
  const annotations: Array<Annotation> = [];

  segments.map((segment, segmentIndex) => {
    if (segment.annotated) {
      if (segmentIndex === 0) {
        annotations.push({
          id: segment.id,
          labelId: segment.annotationLabel || "",
          startOffset: 0,
          endOffset: segment.segmentText.length,
        });
      } else {
        let prevLength = 0;

        segments.slice(0, segmentIndex).map((slicedSegment) => {
          prevLength = prevLength + slicedSegment.segmentText.length;

          return slicedSegment;
        });

        annotations.push({
          id: segment.id,
          labelId: segment.annotationLabel || "",
          startOffset: prevLength,
          endOffset: prevLength + segment.segmentText.length,
        });
      }
    }

    return segment;
  });

  return annotations;
};
