import { SignIn } from "@/components/SignIn";
import { auth } from "@/lib/auth";

const admin = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div className="m-auto size-2/3 bg-red-500">
      <h1>Admin</h1>
      <SignIn />
    </div>
  );
};

export default admin;
