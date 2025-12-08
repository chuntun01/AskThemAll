import { ReactNode } from "react";

export interface AIModel {
  [x: string]: ReactNode;
  provider: any;
  _id: string;
  modelId: string;
  displayName: string;
  isFree: boolean;
}
