import { useState } from "react";
import { User, Student, Mentor } from "../types/User";

type SortField = "studyMinutes" | "score" | "experienceDays";
type SortOrder = "asc" | "desc";

export const useUserTable = (users: User[], allUsers: User[]) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // ソート関数
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // ソートされたユーザーリストを取得
  const getSortedUsers = () => {
    if (!sortField) return users;

    return [...users].sort((a, b) => {
      if (
        a.role === "student" &&
        b.role === "student" &&
        (sortField === "studyMinutes" || sortField === "score")
      ) {
        const aValue = a[sortField];
        const bValue = b[sortField];
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      if (
        a.role === "mentor" &&
        b.role === "mentor" &&
        sortField === "experienceDays"
      ) {
        const aValue = a[sortField];
        const bValue = b[sortField];
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  };

  // メンターが担当可能な生徒を取得する関数
  const getAvailableStudents = (mentor: Mentor): string => {
    const availableStudents = allUsers
      .filter(
        (user): user is Student =>
          user.role === "student" &&
          mentor.availableStartCode <= user.taskCode &&
          mentor.availableEndCode >= user.taskCode
      )
      .map((student) => student.name);

    return availableStudents.length > 0
      ? availableStudents.join(", ")
      : "対応可能な生徒がいません";
  };

  // 生徒に対応可能なメンターを取得する関数
  const getAvailableMentors = (student: Student): string => {
    const availableMentors = allUsers
      .filter(
        (user): user is Mentor =>
          user.role === "mentor" &&
          user.availableStartCode <= student.taskCode &&
          user.availableEndCode >= student.taskCode
      )
      .map((mentor) => mentor.name);

    return availableMentors.length > 0
      ? availableMentors.join(", ")
      : "対応可能なメンターがいません";
  };

  return {
    sortField,
    sortOrder,
    handleSort,
    getSortedUsers,
    getAvailableStudents,
    getAvailableMentors,
  };
};
