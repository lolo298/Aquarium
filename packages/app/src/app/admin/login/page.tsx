import { SignIn } from "@/ui/auth/SignIn";
import { auth } from "@/lib/auth";
import { getAllMarkers } from "@repo/db";

const admin = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div className="m-auto flex w-2/3 flex-col items-center">
      <h1>Admin</h1>
      <SignIn />
    </div>
  );
};

export default admin;
