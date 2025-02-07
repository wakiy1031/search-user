import { User, Student, Mentor } from "../types/User";
import {
  TableContainer,
  NativeTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@yamada-ui/react";

interface UserTableProps {
  users: User[];
  allUsers: User[]; // 全ユーザーリストを追加
}

export const UserTable: React.FC<UserTableProps> = ({ users, allUsers }) => {
  // メンターが担当可能な生徒を取得する関数
  const getAvailableStudents = (mentor: Mentor): string => {
    const availableStudents = allUsers // allUsersを使用
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
    const availableMentors = allUsers // allUsersを使用
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

  // 全てのユーザーが同じroleかチェック
  const isAllSameRole =
    users.length > 0 && users.every((user) => user.role === users[0].role);
  const firstUserRole = users[0]?.role;

  return (
    <TableContainer className="user-table-container">
      <NativeTable>
        <Thead>
          <Tr>
            {/* 共通項目 */}
            <Th>名前</Th>
            <Th>役割</Th>
            <Th>メール</Th>
            <Th>年齢</Th>
            <Th>郵便番号</Th>
            <Th>電話番号</Th>
            <Th>趣味</Th>
            <Th>URL</Th>
            {/* 生徒のみの項目 */}
            {(!isAllSameRole || firstUserRole === "student") && (
              <>
                <Th>勉強時間</Th>
                <Th>課題番号</Th>
                <Th>勉強中の言語</Th>
                <Th>スコア</Th>
                <Th>対応可能なメンター</Th>
              </>
            )}
            {/* メンターのみの項目 */}
            {(!isAllSameRole || firstUserRole === "mentor") && (
              <>
                <Th>実務経験月数</Th>
                <Th>現場で使っている言語</Th>
                <Th>担当できる課題番号初め</Th>
                <Th>担当できる課題番号終わり</Th>
                <Th>対応可能な生徒</Th>
              </>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              {/* 共通項目 */}
              <Td>{user.name}</Td>
              <Td>{user.role === "student" ? "生徒" : "メンター"}</Td>
              <Td>{user.email}</Td>
              <Td>{user.age}</Td>
              <Td>{user.postCode}</Td>
              <Td>{user.phone}</Td>
              <Td>{user.hobbies.join(", ")}</Td>
              <Td>
                <a href={user.url} target="_blank" rel="noopener noreferrer">
                  {user.url}
                </a>
              </Td>
              {/* 生徒のみの項目 */}
              {(!isAllSameRole || firstUserRole === "student") && (
                <>
                  <Td>{user.role === "student" ? user.studyMinutes : "-"}</Td>
                  <Td>{user.role === "student" ? user.taskCode : "-"}</Td>
                  <Td>
                    {user.role === "student" ? user.studyLangs.join(", ") : "-"}
                  </Td>
                  <Td>{user.role === "student" ? user.score : "-"}</Td>
                  <Td>
                    {user.role === "student" ? getAvailableMentors(user) : "-"}
                  </Td>
                </>
              )}
              {/* メンターのみの項目 */}
              {(!isAllSameRole || firstUserRole === "mentor") && (
                <>
                  <Td>{user.role === "mentor" ? user.experienceDays : "-"}</Td>
                  <Td>
                    {user.role === "mentor" ? user.useLangs.join(", ") : "-"}
                  </Td>
                  <Td>
                    {user.role === "mentor" ? user.availableStartCode : "-"}
                  </Td>
                  <Td>
                    {user.role === "mentor" ? user.availableEndCode : "-"}
                  </Td>
                  <Td>
                    {user.role === "mentor" ? getAvailableStudents(user) : "-"}
                  </Td>
                </>
              )}
            </Tr>
          ))}
        </Tbody>
      </NativeTable>
    </TableContainer>
  );
};
