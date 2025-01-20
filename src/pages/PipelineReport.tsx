import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Bar, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const data = [
  { stage: 'New', count: 2, conversionRate: 85 },
  { stage: 'Contacted', count: 3, conversionRate: 75 },
  { stage: 'Follow-Up', count: 4, conversionRate: 60 },
  { stage: 'Quoted', count: 3, conversionRate: 45 },
  { stage: 'Negotiation', count: 2, conversionRate: 30 },
  { stage: 'Won', count: 3, conversionRate: 100 },
  { stage: 'Lost', count: 4, conversionRate: 0 },
];

const chartConfig = {
  count: {
    theme: {
      light: "hsl(var(--primary))",
      dark: "hsl(var(--primary))",
    },
  },
  conversionRate: {
    theme: {
      light: "hsl(var(--success))",
      dark: "hsl(var(--success))",
    },
  },
};

const PipelineReport = () => {
  const navigate = useNavigate();
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <AppHeader />
          <div className="p-8">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Pipeline Analysis</h1>
              <div className="space-x-4">
                <Button variant="outline" onClick={() => navigate("/reports")}>
                  Back to Reports
                </Button>
                <Button variant="outline" onClick={() => navigate("/")}>
                  Back to Pipeline
                </Button>
              </div>
            </div>
            
            <div className="grid gap-6 mb-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Leads by Stage</h2>
                <div className="h-[400px]">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer>
                      <Bar data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="stage" />
                        <YAxis />
                        <ChartTooltip />
                        <Legend />
                        <Bar
                          dataKey="count"
                          fill="var(--color-count)"
                          radius={[4, 4, 0, 0]}
                          name="Number of Leads"
                        />
                      </Bar>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Conversion Rate by Stage</h2>
                <div className="h-[400px]">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer>
                      <Line data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="stage" />
                        <YAxis />
                        <ChartTooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="conversionRate"
                          stroke="var(--color-conversionRate)"
                          name="Conversion Rate (%)"
                          strokeWidth={2}
                          dot={{ strokeWidth: 2 }}
                        />
                      </Line>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PipelineReport;
