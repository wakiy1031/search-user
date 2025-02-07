import { HStack, Select, Option } from "@yamada-ui/react";

interface UserFilterProps {
  hobbyFilter: string;
  setHobbyFilter: (value: string) => void;
  languageFilter: string;
  setLanguageFilter: (value: string) => void;
  allHobbies: string[];
  allLanguages: string[];
}

export const UserFilter: React.FC<UserFilterProps> = ({
  hobbyFilter,
  setHobbyFilter,
  languageFilter,
  setLanguageFilter,
  allHobbies,
  allLanguages,
}) => {
  return (
    <HStack gap={4} mb={4}>
      <Select
        placeholder="趣味でフィルター"
        value={hobbyFilter}
        onChange={(value) => setHobbyFilter(value)}
        w="200px"
      >
        {allHobbies.map((hobby) => (
          <Option key={hobby} value={hobby}>
            {hobby}
          </Option>
        ))}
      </Select>

      <Select
        placeholder="言語でフィルター"
        value={languageFilter}
        onChange={(value) => setLanguageFilter(value)}
        w="200px"
      >
        {allLanguages.map((lang) => (
          <Option key={lang} value={lang}>
            {lang}
          </Option>
        ))}
      </Select>
    </HStack>
  );
};
