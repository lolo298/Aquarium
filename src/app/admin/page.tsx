import { SignIn } from "@/components/SignIn";
import { SignOut } from "@/components/SignOut";
import { auth } from "@/lib/auth";

const admin = async () => {
  const session = await auth();

  return (
    <>
      <div>
        <h1>Admin</h1>
        <SignOut />
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </>
  );
};

export default admin;
