type IItem<T extends object> = {
  label: string;
  color?: string;
  handleClick: (item: T) => void;
};

export type Props<T extends object> = {
  items: IItem<T>[];
  currentItem: any;
};
