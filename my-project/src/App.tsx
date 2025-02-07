import { UserTable } from "./components/UserTable";
import { USER_LIST } from "./data/users";
import "./App.css";
import { UIProvider, Box } from "@yamada-ui/react";
import { UserSelectButton } from "./components/UserSelectButton";
import { UserCreateModal } from "./components/UserCreateModal";
import { useState } from "react";
import { User } from "./types/User";

function App() {
  const [selectedRole, setSelectedRole] = useState<string>("全て");
  const [users, setUsers] = useState<User[]>(USER_LIST);

  // ユーザーリストをフィルタリングする関数
  const getFilteredUsers = (): User[] => {
    switch (selectedRole) {
      case "生徒":
        return users.filter((user) => user.role === "student");
      case "メンター":
        return users.filter((user) => user.role === "mentor");
      default:
        return users;
    }
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
          <UserSelectButton
            selected={selectedRole}
            onSelect={setSelectedRole}
          />
        </Box>
        <UserTable users={getFilteredUsers()} allUsers={users} />
      </Box>
    </UIProvider>
  );
}

export default App;
