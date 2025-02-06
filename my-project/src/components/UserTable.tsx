import { User, Student, Mentor } from "../types/User";

interface UserTableProps {
  users: User[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
  // メンターが担当可能な生徒を取得する関数
  const getAvailableStudents = (mentor: Mentor): string => {
    return users
      .filter(
        (user): user is Student =>
          user.role === "student" &&
          user.taskCode >= mentor.availableStartCode &&
          user.taskCode <= mentor.availableEndCode
      )
      .map((student) => student.name)
      .join(", ");
  };

  // 生徒に対応可能なメンターを取得する関数
  const getAvailableMentors = (student: Student): string => {
    return users
      .filter(
        (user): user is Mentor =>
          user.role === "mentor" &&
          student.taskCode >= user.availableStartCode &&
          student.taskCode <= user.availableEndCode
      )
      .map((mentor) => mentor.name)
      .join(", ");
  };

  return (
    <div className="user-table-container">
      <table>
        <thead>
          <tr>
            {/* 共通項目 */}
            <th>名前</th>
            <th>役割</th>
            <th>メール</th>
            <th>年齢</th>
            <th>郵便番号</th>
            <th>電話番号</th>
            <th>趣味</th>
            <th>URL</th>
            {/* 生徒項目 */}
            <th>勉強時間</th>
            <th>課題番号</th>
            <th>勉強中の言語</th>
            <th>スコア</th>
            <th>対応可能なメンター</th>
            {/* メンター項目 */}
            <th>実務経験月数</th>
            <th>現場で使っている言語</th>
            <th>担当できる課題番号初め</th>
            <th>担当できる課題番号終わり</th>
            <th>対応可能な生徒</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {/* 共通項目 */}
              <td>{user.name}</td>
              <td>{user.role === "student" ? "生徒" : "メンター"}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.postCode}</td>
              <td>{user.phone}</td>
              <td>{user.hobbies.join(", ")}</td>
              <td>
                <a href={user.url} target="_blank" rel="noopener noreferrer">
                  {user.url}
                </a>
              </td>
              {/* 生徒項目 */}
              <td>{user.role === "student" ? user.studyMinutes : "-"}</td>
              <td>{user.role === "student" ? user.taskCode : "-"}</td>
              <td>
                {user.role === "student" ? user.studyLangs.join(", ") : "-"}
              </td>
              <td>{user.role === "student" ? user.score : "-"}</td>
              <td>
                {user.role === "student" ? getAvailableMentors(user) : "-"}
              </td>
              {/* メンター項目 */}
              <td>{user.role === "mentor" ? user.experienceDays : "-"}</td>
              <td>{user.role === "mentor" ? user.useLangs.join(", ") : "-"}</td>
              <td>{user.role === "mentor" ? user.availableStartCode : "-"}</td>
              <td>{user.role === "mentor" ? user.availableEndCode : "-"}</td>
              <td>
                {user.role === "mentor" ? getAvailableStudents(user) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
