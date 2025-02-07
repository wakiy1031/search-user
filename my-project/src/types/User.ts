// 共通のユーザー型
interface BaseUser {
  id: number;
  name: string;
  role: "student" | "mentor";
  email: string;
  age: number;
  postCode: string;
  phone: string;
  hobbies: string[];
  url: string;
}

// 生徒特有の型
export interface Student extends BaseUser {
  role: "student";
  studyMinutes: number;
  taskCode: number;
  studyLangs: string[];
  score: number;
}

// メンター特有の型
export interface Mentor extends BaseUser {
  role: "mentor";
  experienceDays: number;
  useLangs: string[];
  availableStartCode: number;
  availableEndCode: number;
}

// ユニオン型
export type User = Student | Mentor;
