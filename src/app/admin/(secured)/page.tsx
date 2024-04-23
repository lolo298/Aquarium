import { SignIn } from "@/components/SignIn";
import { SignOut } from "@/components/SignOut";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { auth } from "@/lib/auth";

const admin = async () => {
  const session = await auth();

  return (
    <>
      <div className="mx-auto grid w-2/3 grid-cols-[2fr_1fr] gap-2">
        <Card>
          <CardHeader>Heya</CardHeader>
          <CardContent>WOOOOOO</CardContent>
        </Card>
        <Card>
          <CardHeader>Heya</CardHeader>
          <CardContent>WOOOOOO</CardContent>
        </Card>
      </div>
    </>
  );
};

export default admin;
