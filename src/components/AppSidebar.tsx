import {
  CalendarDays,
  Home,
  Users,
  FileText,
  Briefcase,
  DollarSign,
  Megaphone,
  BarChart,
  Clock,
  Gift,
  Plus,
  ScrollText,
  Download,
  Image,
  UserPlus,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const menuItems = [
  { icon: Plus, label: "Create" },
  { icon: Home, label: "Home" },
  { icon: CalendarDays, label: "Schedule" },
  { icon: UserPlus, label: "Leads", path: "/" },
  { icon: Users, label: "Clients" },
  { icon: Download, label: "Requests" },
  { icon: ScrollText, label: "Quotes" },
  { icon: Briefcase, label: "Jobs" },
  { icon: DollarSign, label: "Invoices" },
  { icon: Megaphone, label: "Marketing" },
  { icon: BarChart, label: "Reports" },
  { icon: Image, label: "Expenses" },
  { icon: Clock, label: "Timesheets" },
  { icon: Gift, label: "Refer a Friend" },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLeadsPage = location.pathname === "/" || location.pathname === "/pipeline-settings";

  return (
    <Sidebar variant="inset" className="bg-[#F1F1F1] border-r border-slate-200">
      <SidebarContent>
        <SidebarGroup className="pt-10">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <>
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <a 
                        href="#" 
                        className={`flex items-center gap-3 text-[#555555] hover:text-[#333333] hover:bg-[#F6F6F7] ${
                          item.label === "Leads" && isLeadsPage ? "bg-[#F6F6F7]" : ""
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (item.path) {
                            navigate(item.path);
                          }
                        }}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {(item.label === "Schedule" || item.label === "Invoices" || item.label === "Timesheets") && <SidebarSeparator />}
                </>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}