import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

const wonDeals = [
  {
    id: "9",
    name: "Corporate Office Renovation",
    value: 75000,
    daysToClose: 45,
    service: "Commercial Renovation"
  },
  {
    id: "10",
    name: "Luxury Home Theater",
    value: 35000,
    daysToClose: 30,
    service: "Home Entertainment"
  },
  {
    id: "11",
    name: "Smart Home Installation",
    value: 25000,
    daysToClose: 21,
    service: "Home Automation"
  }
];

const valueByService = [
  { service: "Commercial Renovation", value: 75000 },
  { service: "Home Entertainment", value: 35000 },
  { service: "Home Automation", value: 25000 }
];

const chartConfig = {
  value: {
    theme: {
      light: "hsl(var(--success))",
      dark: "hsl(var(--success))",
    },
  },
};

const WonDealsReport = () => {
  const navigate = useNavigate();
  const totalValue = wonDeals.reduce((sum, deal) => sum + deal.value, 0);
  const avgDaysToClose = Math.round(
    wonDeals.reduce((sum, deal) => sum + deal.daysToClose, 0) / wonDeals.length
  );
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <AppHeader />
          <div className="p-8">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Won Deals Analysis</h1>
              <div className="space-x-4">
                <Button variant="outline" onClick={() => navigate("/reports")}>
                  Back to Reports
                </Button>
                <Button variant="outline" onClick={() => navigate("/")}>
                  Back to Pipeline
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Total Value</h3>
                <p className="text-3xl font-bold text-green-600">
                  ${totalValue.toLocaleString()}
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Avg. Days to Close</h3>
                <p className="text-3xl font-bold text-blue-600">
                  {avgDaysToClose} days
                </p>
              </Card>
            </div>

            <Card className="p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Value by Service</h2>
              <div className="h-[400px]">
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer>
                    <Bar data={valueByService}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="service" />
                      <YAxis />
                      <ChartTooltip />
                      <Legend />
                      <Bar
                        dataKey="value"
                        fill="var(--color-value)"
                        radius={[4, 4, 0, 0]}
                        name="Deal Value ($)"
                      />
                    </Bar>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Won Deals Details</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Deal Name</th>
                      <th className="text-left p-4">Service</th>
                      <th className="text-right p-4">Value</th>
                      <th className="text-right p-4">Days to Close</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wonDeals.map((deal) => (
                      <tr key={deal.id} className="border-b">
                        <td className="p-4">{deal.name}</td>
                        <td className="p-4">{deal.service}</td>
                        <td className="text-right p-4">${deal.value.toLocaleString()}</td>
                        <td className="text-right p-4">{deal.daysToClose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default WonDealsReport;
