import { getAuthenticatedUser, getUserByEmail } from "@/app/services/apiUsers";

export default async function UserInfo() {
  const { user } = await getAuthenticatedUser();

  if (!user?.email) {
    return null;
  }

  const { user: userToView } = await getUserByEmail(user.email);

  if (!userToView || !userToView.full_name) {
    return null;
  }

  const [name, surname] = userToView.full_name.split(" ");
  const firstCharName = name?.charAt(0).toUpperCase() ?? "";
  const firstCharSurname = surname?.charAt(0).toUpperCase() ?? "";

  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white text-white font-bold">
      {firstCharName}
      {firstCharSurname}
    </div>
  );
}
