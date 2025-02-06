import { UserTable } from "./components/UserTable";
import { USER_LIST } from "./data/users";
import "./App.css";
import { UIProvider, Box } from "@yamada-ui/react";

function App() {
  return (
    <UIProvider>
      <Box className="app">
        <h1>ユーザー一覧</h1>
        <UserTable users={USER_LIST} />
      </Box>
    </UIProvider>
  );
}

export default App;
