import { Card, CardContent } from "@/components/ui/card";

const UserGreetingFallback = () => {
  return (
    <div className="flex h-screen">
      <div className="w-72 bg-blue-950"></div>
      <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
        <Card className="w-full max-w-md bg-blue-900/40 border-amber-200/10">
          <CardContent className="flex justify-center items-center p-6">
            <p className="text-amber-100">Loading dashboard...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserGreetingFallback;
