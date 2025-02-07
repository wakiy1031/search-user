import { UserTable } from "./components/UserTable";
import { USER_LIST } from "./data/users";
import "./App.css";
import { UIProvider, Box } from "@yamada-ui/react";
import { UserSelectButton } from "./components/UserSelectButton";
import { useState } from "react";
import { User } from "./types/User";

function App() {
  const [selectedRole, setSelectedRole] = useState<string>("全て");

  // ユーザーリストをフィルタリングする関数
  const getFilteredUsers = (): User[] => {
    switch (selectedRole) {
      case "生徒":
        return USER_LIST.filter((user) => user.role === "student");
      case "メンター":
        return USER_LIST.filter((user) => user.role === "mentor");
      default:
        return USER_LIST;
    }
  };

  return (
    <UIProvider>
      <Box className="app">
        <h1>ユーザー一覧</h1>
        <UserSelectButton selected={selectedRole} onSelect={setSelectedRole} />
        <UserTable users={getFilteredUsers()} allUsers={USER_LIST} />
      </Box>
    </UIProvider>
  );
}

export default App;
