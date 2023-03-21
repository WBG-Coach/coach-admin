import { Component } from "react";
import { Box } from "@chakra-ui/react";
import { icons } from "./Icon.data";
import { Props } from "./types";

export default class Icon extends Component<Props> {
  static defaultProps = {
    color: "#333",
    size: 16,
  };

  render(): JSX.Element {
    const { color, size = 24, name, onClick, ...otherProps } = this.props;
    const localIcons: any = icons;

    return icons && localIcons[name] ? (
      <Box {...otherProps} onClick={onClick}>
        <svg width={size} height={size} viewBox="0 0 1024 1024">
          <path d={localIcons[name]} fill={color} />
        </svg>
      </Box>
    ) : (
      <></>
    );
  }
}
