import { User } from "../types/User";

interface UserTableProps {
  users: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="user-table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名前</th>
            <th>役割</th>
            <th>メール</th>
            <th>年齢</th>
            <th>趣味</th>
            <th>URL</th>
            {/* 共通のヘッダーのみ表示 */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.role === "student" ? "生徒" : "メンター"}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.hobbies.join(", ")}</td>
              <td>
                <a href={user.url} target="_blank" rel="noopener noreferrer">
                  {user.url}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
