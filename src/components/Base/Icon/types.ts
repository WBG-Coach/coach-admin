import { BoxProps } from "@chakra-ui/react";

export interface OwnProps {
  name: string;

  color?: string;

  size?: number;

  onClick?: (e: any) => void;
}

export type Props = BoxProps & OwnProps;
