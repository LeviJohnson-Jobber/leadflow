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
        <SidebarGroup className="pt-10">
          <SidebarGroupContent>
            <SidebarMenu />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}