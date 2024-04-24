import { Card, CardContent, CardHeader } from "@/ui/components/card";
import { auth } from "@/lib/auth";

const admin = async () => {
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
