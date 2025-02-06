import { UserTable } from "./components/UserTable";
import { USER_LIST } from "./data/users";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>ユーザー一覧</h1>
      <UserTable users={USER_LIST} />
    </div>
  );
}

export default App;
