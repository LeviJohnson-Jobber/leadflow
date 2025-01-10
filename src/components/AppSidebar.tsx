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
} from "lucide-react";

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
  return (
    <Sidebar variant="inset" className="bg-slate-50 border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <>
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild>
                      <a href="#" className="flex items-center gap-3 text-slate-700">
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {(index === 1 || index === 7 || index === 11) && <SidebarSeparator />}
                </>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}