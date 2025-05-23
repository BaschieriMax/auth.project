import Title from "./Title";
import UserInfo from "./UserInfo";

export default async function Header() {
  return (
    <header className="p-5 bg-black shadow-md">
      <div className="flex items-center justify-between">
        <Title />
        <UserInfo />
      </div>
    </header>
  );
}
