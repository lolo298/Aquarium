import { Card, CardContent, CardHeader } from "@/ui/components/card";
import { auth } from "@/lib/auth";
import { getAllMarkers } from "@repo/db";

const admin = async () => {
  return (
    <>
      <div className="mx-auto grid w-2/3 grid-cols-[2fr_1fr] gap-2">
        <Card>
          <CardHeader>Heya</CardHeader>
          <CardContent>WOOOOOO</CardContent>
        </Card>
        <a href="/admin/markers">
          <Card>
            <CardHeader>Actives markers</CardHeader>
            <CardContent>X actives markers</CardContent>
          </Card>
        </a>
      </div>
    </>
  );
};

export default admin;
