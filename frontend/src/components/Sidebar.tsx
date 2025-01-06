'use client';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Home as HomeIcon,
  Settings,
  HelpCircle,
} from "lucide-react";

const Sidebar = () => {
  const router = useRouter();

  const sidebarItems = [
    { label: "Home", icon: <HomeIcon className="mr-3 h-4 w-4" />, to: "/" },
  ];

  const handleNavigation = (to: string) => {
    router.push(to);
  };

  return (
    <div className="w-72 p-6 space-y-6 bg-blue-950 h-screen border-r border-amber-200/10">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-amber-100">Demo App</h2>
        <p className="text-amber-200/60 text-sm mt-1">call Management</p>
      </div>

      <div className="space-y-1">
        {sidebarItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start text-amber-100/80 hover:text-amber-100 hover:bg-blue-900/50"
            onClick={() => handleNavigation(item.to)}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </div>

      <div className="pt-6 space-y-1">
        <div className="text-amber-200/40 text-xs font-medium px-3 mb-2">Settings</div>
        <Button
          variant="ghost"
          className="w-full justify-start text-amber-100/80 hover:text-amber-100 hover:bg-blue-900/50"
        >
          <Settings className="mr-3 h-4 w-4" />
          Preferences
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-amber-100/80 hover:text-amber-100 hover:bg-blue-900/50"
        >
          <HelpCircle className="mr-3 h-4 w-4" />
          Support
        </Button>

      </div>
    </div>
  );
};

export default Sidebar;
