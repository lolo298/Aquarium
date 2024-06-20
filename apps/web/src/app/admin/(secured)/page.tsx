import { Card, CardContent, CardHeader } from "@/ui/components/card";
import { getAllMarkers } from "@repo/db";

const admin = async () => {
  const markers = await getAllMarkers();

  const count = markers.length;

  return (
    <>
      <div className="mx-auto grid w-2/3 grid-cols-[2fr_1fr] gap-2">
        <a href="/admin/markers">
          <Card>
            <CardHeader>Actives markers</CardHeader>
            <CardContent>{count} actives markers</CardContent>
          </Card>
        </a>
      </div>
    </>
  );
};

export default admin;
