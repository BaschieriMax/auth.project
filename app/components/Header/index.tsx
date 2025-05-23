import { getAuthenticatedUser } from "@/app/services/apiUsers";
import Title from "./Title";
// import { getAuthenticatedUser } from "@/app/services/apiUsers";

export default async function Header() {
  const { user } = await getAuthenticatedUser();
  console.log(user);
  return (
    <header className="p-4 bg-black shadow-md">
      <div className="flex items-center justify-between">
        <Title />
        {user && "hi" + user.email}
      </div>
    </header>
  );
}
