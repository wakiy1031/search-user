import { UserTable } from "./components/UserTable";
import { USER_LIST } from "./data/users";
import "./App.css";
import { UIProvider, Box, Flex } from "@yamada-ui/react";
import { UserSelectButton } from "./components/UserSelectButton";
import { UserCreateModal } from "./components/UserCreateModal";
import { UserFilter } from "./components/UserFilter";
import { useState } from "react";
import { User } from "./types/User";
import { useUserFilter } from "./hooks/useUserFilter";

function App() {
  const [selectedRole, setSelectedRole] = useState<string>("全て");
  const [users, setUsers] = useState<User[]>(USER_LIST);

  // フィルター機能を使用
  const {
    hobbyFilter,
    setHobbyFilter,
    languageFilter,
    setLanguageFilter,
    allHobbies,
    allLanguages,
    filteredUsers,
  } = useUserFilter(users);

  // ユーザーリストをフィルタリングする関数
  const getFilteredUsers = (): User[] => {
    const roleFilteredUsers =
      selectedRole === "生徒"
        ? filteredUsers.filter((user) => user.role === "student")
        : selectedRole === "メンター"
        ? filteredUsers.filter((user) => user.role === "mentor")
        : filteredUsers;

    return roleFilteredUsers;
  };

  // 新規ユーザーを追加する関数
  const handleCreateUser = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  return (
    <UIProvider>
      <Box className="app">
        <h1>ユーザー一覧</h1>
        <Box mb={4}>
          <UserCreateModal onCreateUser={handleCreateUser} />
          <Flex gap={4}>
            <UserSelectButton
              selected={selectedRole}
              onSelect={setSelectedRole}
            />
            <UserFilter
              hobbyFilter={hobbyFilter}
              setHobbyFilter={setHobbyFilter}
              languageFilter={languageFilter}
              setLanguageFilter={setLanguageFilter}
              allHobbies={allHobbies}
              allLanguages={allLanguages}
            />
          </Flex>
        </Box>
        <UserTable users={getFilteredUsers()} allUsers={users} />
      </Box>
    </UIProvider>
  );
}

export default App;
