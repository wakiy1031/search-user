import { useState, useMemo } from "react";
import { User, Student, Mentor } from "../types/User";

export const useUserFilter = (users: User[]) => {
  const [hobbyFilter, setHobbyFilter] = useState<string>("");
  const [languageFilter, setLanguageFilter] = useState<string>("");

  // 全ての趣味を取得
  const allHobbies = useMemo(() => {
    const hobbiesSet = new Set<string>();
    users.forEach((user) => {
      user.hobbies.forEach((hobby) => hobbiesSet.add(hobby));
    });
    return Array.from(hobbiesSet).sort();
  }, [users]);

  // 全ての言語を取得
  const allLanguages = useMemo(() => {
    const languagesSet = new Set<string>();
    users.forEach((user) => {
      if (user.role === "student") {
        user.studyLangs.forEach((lang) => languagesSet.add(lang));
      } else {
        user.useLangs.forEach((lang) => languagesSet.add(lang));
      }
    });
    return Array.from(languagesSet).sort();
  }, [users]);

  // フィルタリングされたユーザーを取得
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchHobby = !hobbyFilter || user.hobbies.includes(hobbyFilter);

      const matchLanguage =
        !languageFilter ||
        (user.role === "student"
          ? (user as Student).studyLangs.includes(languageFilter)
          : (user as Mentor).useLangs.includes(languageFilter));

      return matchHobby && matchLanguage;
    });
  }, [users, hobbyFilter, languageFilter]);

  return {
    hobbyFilter,
    setHobbyFilter,
    languageFilter,
    setLanguageFilter,
    allHobbies,
    allLanguages,
    filteredUsers,
  };
};
