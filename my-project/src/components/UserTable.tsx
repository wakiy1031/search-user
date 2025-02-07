import { User } from "../types/User";
import {
  TableContainer,
  NativeTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
} from "@yamada-ui/react";
import { useUserTable } from "../hooks/useUserTable";

interface UserTableProps {
  users: User[];
  allUsers: User[];
}

type SortField = "studyMinutes" | "score" | "experienceDays";

export const UserTable: React.FC<UserTableProps> = ({ users, allUsers }) => {
  const {
    sortField,
    sortOrder,
    handleSort,
    getSortedUsers,
    getAvailableStudents,
    getAvailableMentors,
  } = useUserTable(users, allUsers);

  // 全てのユーザーが同じroleかチェック
  const isAllSameRole =
    users.length > 0 && users.every((user) => user.role === users[0].role);
  const firstUserRole = users[0]?.role;

  // ソートボタンのレンダリング
  const renderSortButton = (field: SortField) => {
    const isActive = sortField === field;
    return (
      <Button
        size="xs"
        variant={isActive ? "solid" : "outline"}
        onClick={() => handleSort(field)}
        ml={2}
      >
        {isActive ? (sortOrder === "asc" ? "↓" : "↑") : "⇅"}
      </Button>
    );
  };

  const sortedUsers = getSortedUsers();

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
                <Th>
                  <HStack gap={2}>
                    <span>勉強時間</span>
                    {isAllSameRole &&
                      firstUserRole === "student" &&
                      renderSortButton("studyMinutes")}
                  </HStack>
                </Th>
                <Th>課題番号</Th>
                <Th>勉強中の言語</Th>
                <Th>
                  <HStack gap={2}>
                    <span>スコア</span>
                    {isAllSameRole &&
                      firstUserRole === "student" &&
                      renderSortButton("score")}
                  </HStack>
                </Th>
                <Th>対応可能なメンター</Th>
              </>
            )}
            {/* メンターのみの項目 */}
            {(!isAllSameRole || firstUserRole === "mentor") && (
              <>
                <Th>
                  <HStack gap={2}>
                    <span>実務経験月数</span>
                    {isAllSameRole &&
                      firstUserRole === "mentor" &&
                      renderSortButton("experienceDays")}
                  </HStack>
                </Th>
                <Th>現場で使っている言語</Th>
                <Th>担当できる課題番号初め</Th>
                <Th>担当できる課題番号終わり</Th>
                <Th>対応可能な生徒</Th>
              </>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {sortedUsers.map((user) => (
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
