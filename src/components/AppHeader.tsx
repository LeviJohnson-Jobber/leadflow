import { Search, Bell, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-slate-900"></div>
          <span className="text-lg font-semibold">GROW</span>
        </div>
        
        <div className="flex-1 ml-8">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
            <Input placeholder="Search..." className="pl-8" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <div className="h-8 w-8 rounded-full bg-slate-200"></div>
        </div>
      </div>
    </header>
  );
}