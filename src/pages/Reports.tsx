import { useNavigate } from "react-router-dom";
import { BarChart2, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Reports = () => {
  const navigate = useNavigate();

  const reportTypes = [
    {
      title: "Pipeline Reports",
      icon: BarChart2,
      path: "/reports/pipeline",
      description: "View pipeline performance and stage analytics"
    },
    {
      title: "Deals Won",
      icon: ThumbsUp,
      path: "/reports/won",
      description: "Analyze successful deals and conversion rates"
    },
    {
      title: "Deals Lost",
      icon: ThumbsDown,
      path: "/reports/lost",
      description: "Review lost opportunities and identify patterns"
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <AppHeader />
          <div className="p-8">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Reports</h1>
              <Button variant="outline" onClick={() => navigate("/")}>
                Back to Pipeline
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {reportTypes.map((report) => (
                <Card
                  key={report.title}
                  className="p-6 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => navigate(report.path)}
                >
                  <div className="mb-4">
                    <report.icon className="h-8 w-8 text-slate-600" />
                  </div>
                  <h2 className="text-lg font-semibold mb-2">{report.title}</h2>
                  <p className="text-sm text-slate-600">{report.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Reports;