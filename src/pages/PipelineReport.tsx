import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

type StageData = {
  name: string;
  value: number;
  stage: string;
  count: number;
  conversionRate: number;
}

const data: StageData[] = [
  { name: "New", value: 2, stage: "New", count: 2, conversionRate: 85 },
  { name: "Contacted", value: 3, stage: "Contacted", count: 3, conversionRate: 75 },
  { name: "Follow-Up", value: 4, stage: "Follow-Up", count: 4, conversionRate: 60 },
  { name: "Quoted", value: 3, stage: "Quoted", count: 3, conversionRate: 45 },
  { name: "Negotiation", value: 2, stage: "Negotiation", count: 2, conversionRate: 30 },
  { name: "Won", value: 3, stage: "Won", count: 3, conversionRate: 100 },
  { name: "Lost", value: 4, stage: "Lost", count: 4, conversionRate: 0 },
];

const chartConfig = {
  value: {
    theme: {
      light: "hsl(var(--primary))",
      dark: "hsl(var(--primary))",
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
                      <Bar data={data} dataKey="value">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip />
                        <Legend />
                        <Bar
                          dataKey="value"
                          fill="var(--color-value)"
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
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="conversionRate"
                          stroke="var(--color-value)"
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