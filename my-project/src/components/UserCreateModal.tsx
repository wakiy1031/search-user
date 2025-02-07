import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  FormControl,
  Input,
  Button,
  VStack,
  Select,
  NumberInput,
  useDisclosure,
  Label,
  Option,
} from "@yamada-ui/react";
import { useState } from "react";
import { User, Student, Mentor } from "../types/User";

interface UserCreateModalProps {
  onCreateUser: (user: User) => void;
}

export const UserCreateModal: React.FC<UserCreateModalProps> = ({
  onCreateUser,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [role, setRole] = useState<"student" | "mentor">("student");

  // 共通のフォーム状態
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<number>(20);
  const [postCode, setPostCode] = useState("");
  const [phone, setPhone] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [url, setUrl] = useState("");

  // 生徒用のフォーム状態
  const [studyMinutes, setStudyMinutes] = useState<number>(0);
  const [taskCode, setTaskCode] = useState<number>(0);
  const [studyLangs, setStudyLangs] = useState("");
  const [score, setScore] = useState<number>(0);

  // メンター用のフォーム状態
  const [experienceDays, setExperienceDays] = useState<number>(0);
  const [useLangs, setUseLangs] = useState("");
  const [availableStartCode, setAvailableStartCode] = useState<number>(0);
  const [availableEndCode, setAvailableEndCode] = useState<number>(0);

  const handleSubmit = () => {
    const baseUser = {
      id: Date.now(), // 一時的なID
      name,
      email,
      age,
      postCode,
      phone,
      hobbies: hobbies.split(",").map((h) => h.trim()),
      url,
    };

    if (role === "student") {
      const student: Student = {
        ...baseUser,
        role: "student",
        studyMinutes,
        taskCode,
        studyLangs: studyLangs.split(",").map((l) => l.trim()),
        score,
      };
      onCreateUser(student);
    } else {
      const mentor: Mentor = {
        ...baseUser,
        role: "mentor",
        experienceDays,
        useLangs: useLangs.split(",").map((l) => l.trim()),
        availableStartCode,
        availableEndCode,
      };
      onCreateUser(mentor);
    }

    onClose();
    // フォームをリセット
    setName("");
    setEmail("");
    setAge(20);
    setPostCode("");
    setPhone("");
    setHobbies("");
    setUrl("");
    setStudyMinutes(0);
    setTaskCode(0);
    setStudyLangs("");
    setScore(0);
    setExperienceDays(0);
    setUseLangs("");
    setAvailableStartCode(0);
    setAvailableEndCode(0);
  };

  return (
    <>
      <Button onClick={onOpen} mb={4}>
        新規ユーザー作成
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalBody>
          <ModalHeader>新規ユーザー作成</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="full">
            <VStack gap={4} mb={4}>
              <FormControl>
                <Label>役割</Label>
                <Select
                  value={role}
                  onChange={(value: string) =>
                    setRole(value as "student" | "mentor")
                  }
                >
                  <Option value="student">生徒</Option>
                  <Option value="mentor">メンター</Option>
                </Select>
              </FormControl>

              {/* 共通項目 */}
              <FormControl>
                <Label>名前</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl>
                <Label>メールアドレス</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Label>年齢</Label>
                <NumberInput
                  value={age}
                  onChange={(_, value) => setAge(value)}
                />
              </FormControl>
              <FormControl>
                <Label>郵便番号</Label>
                <Input
                  value={postCode}
                  onChange={(e) => setPostCode(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Label>電話番号</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Label>趣味（カンマ区切り）</Label>
                <Input
                  value={hobbies}
                  onChange={(e) => setHobbies(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Label>URL</Label>
                <Input value={url} onChange={(e) => setUrl(e.target.value)} />
              </FormControl>

              {/* 生徒用フォーム */}
              {role === "student" && (
                <>
                  <FormControl>
                    <Label>勉強時間（分）</Label>
                    <NumberInput
                      value={studyMinutes}
                      onChange={(_, value) => setStudyMinutes(value)}
                    />
                  </FormControl>
                  <FormControl>
                    <Label>課題番号</Label>
                    <NumberInput
                      value={taskCode}
                      onChange={(_, value) => setTaskCode(value)}
                    />
                  </FormControl>
                  <FormControl>
                    <Label>勉強中の言語（カンマ区切り）</Label>
                    <Input
                      value={studyLangs}
                      onChange={(e) => setStudyLangs(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <Label>スコア</Label>
                    <NumberInput
                      value={score}
                      onChange={(_, value) => setScore(value)}
                    />
                  </FormControl>
                </>
              )}

              {/* メンター用フォーム */}
              {role === "mentor" && (
                <>
                  <FormControl>
                    <Label>実務経験月数</Label>
                    <NumberInput
                      value={experienceDays}
                      onChange={(_, value) => setExperienceDays(value)}
                    />
                  </FormControl>
                  <FormControl>
                    <Label>現場で使用している言語（カンマ区切り）</Label>
                    <Input
                      value={useLangs}
                      onChange={(e) => setUseLangs(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <Label>担当できる課題番号（開始）</Label>
                    <NumberInput
                      value={availableStartCode}
                      onChange={(_, value) => setAvailableStartCode(value)}
                    />
                  </FormControl>
                  <FormControl>
                    <Label>担当できる課題番号（終了）</Label>
                    <NumberInput
                      value={availableEndCode}
                      onChange={(_, value) => setAvailableEndCode(value)}
                    />
                  </FormControl>
                </>
              )}

              <Button colorScheme="blue" onClick={handleSubmit} w="full">
                作成
              </Button>
            </VStack>
          </ModalBody>
        </ModalBody>
      </Modal>
    </>
  );
};
