import { SpaceProps } from "styled-system";

export interface OwnProps {
  /** Icon name (see names on example below) */
  name: string;
  /** Icon color */
  color?: string;
  /** Icon size (square: size x size) */
  size?: string;
  onClick?: (e: any) => void;
}

export type Props = OwnProps & SpaceProps;
