import { useLocation, useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import {
  SidebarMenuButton,
  SidebarMenuItem as BaseSidebarMenuItem,
} from "@/components/ui/sidebar";

interface SidebarMenuItemProps {
  icon: LucideIcon;
  label: string;
  path?: string;
}

export function SidebarMenuItem({ icon: Icon, label, path }: SidebarMenuItemProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLeadsPage = location.pathname === "/" || location.pathname === "/pipeline-settings";
  const isActive = label === "Leads" && isLeadsPage;

  return (
    <BaseSidebarMenuItem>
      <SidebarMenuButton asChild>
        <a
          href="#"
          className={`flex items-center gap-3 text-[#555555] hover:text-[#333333] hover:bg-[#F6F6F7] ${
            isActive ? "bg-[#F6F6F7]" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            if (path) {
              navigate(path);
            }
          }}
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </a>
      </SidebarMenuButton>
    </BaseSidebarMenuItem>
  );
}