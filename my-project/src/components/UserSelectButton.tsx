import { Select, Option } from "@yamada-ui/react";
import { Dispatch, SetStateAction } from "react";

interface UserSelectButtonProps {
  selected: string;
  onSelect: Dispatch<SetStateAction<string>>;
}

export const UserSelectButton: React.FC<UserSelectButtonProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <Select w="200px" value={selected} onChange={onSelect}>
      <Option value="全て">全て</Option>
      <Option value="生徒">生徒</Option>
      <Option value="メンター">メンター</Option>
    </Select>
  );
};
