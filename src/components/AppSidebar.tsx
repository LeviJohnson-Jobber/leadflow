import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { SidebarMenu } from "./sidebar/SidebarMenu";

export function AppSidebar() {
  return (
    <Sidebar variant="inset" className="bg-[#F1F1F1] border-r border-slate-200">
      <SidebarContent>
        <div className="px-4 pt-4 pb-2">
          <img 
            src="/lovable-uploads/0d43ecf4-6b79-4b5e-aec9-e3f213c20fda.png" 
            alt="Logo" 
            className="w-8 h-8"
          />
        </div>
        <SidebarGroup className="pt-4">
          <SidebarGroupContent>
            <SidebarMenu />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}