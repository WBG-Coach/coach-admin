import { Box } from "@chakra-ui/react";
import React, { Component } from "react";
import { icons } from "./Icon.data";
import { Props } from "./types";

/**
 * Svg icon component
 */
export default class Icon extends Component<Props> {
  static defaultProps = {
    color: "#333",
    size: 16,
  };

  render(): JSX.Element {
    const { color, size = "24px", name, onClick } = this.props;
    const localIcons: any = icons;

    return icons && localIcons[name] ? (
      <Box {...this.props} onClick={onClick}>
        <svg width={size} height={size} viewBox="0 0 1024 1024">
          <path d={localIcons[name]} fill={color} />
        </svg>
      </Box>
    ) : (
      <></>
    );
  }
}
