export type SegmentRange = {
  id: string;
  startOffset: number;
  endOffset: number;
  annotated: boolean;
  annotationLabel?: string;
};

export default SegmentRange;
