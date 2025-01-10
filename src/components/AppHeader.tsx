import { Search, Sparkles, MessageSquare, Bell, HelpCircle, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-[#f8f9fa]">
      <div className="flex h-14 items-center px-4">
        <div className="flex-1" />
        
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search" 
              className="pl-9 pr-12 bg-slate-50 border-slate-200 text-sm h-9" 
            />
            <div className="absolute right-2.5 top-2 px-1.5 py-0.5 rounded border border-slate-200 bg-white text-xs text-slate-400">
              /
            </div>
          </div>

          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Sparkles className="h-[18px] w-[18px] text-slate-600" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <MessageSquare className="h-[18px] w-[18px] text-slate-600" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 relative">
            <Bell className="h-[18px] w-[18px] text-slate-600" />
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <HelpCircle className="h-[18px] w-[18px] text-slate-600" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 relative">
            <Settings className="h-[18px] w-[18px] text-slate-600" />
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </Button>
          <div className="h-8 w-8 rounded-full bg-slate-200"></div>
        </div>
      </div>
    </header>
  );
}