import { SidebarMenu as BaseSidebarMenu, SidebarSeparator } from "@/components/ui/sidebar";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { menuItems } from "@/config/sidebarConfig";

export function SidebarMenu() {
  return (
    <BaseSidebarMenu>
      {menuItems.map((item) => (
        <>
          <SidebarMenuItem key={item.label} {...item} />
          {(item.label === "Schedule" || 
            item.label === "Invoices" || 
            item.label === "Timesheets") && <SidebarSeparator />}
        </>
      ))}
    </BaseSidebarMenu>
  );
}