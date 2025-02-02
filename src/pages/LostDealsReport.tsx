import { useNavigate } from "react-router-dom";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const lostDeals = [
  {
    id: "12",
    name: "Restaurant Remodel",
    value: 120000,
    reason: "Budget constraints",
    service: "Commercial Renovation"
  },
  {
    id: "13",
    name: "Office Security System",
    value: 45000,
    reason: "Competitor selected",
    service: "Security Systems"
  },
  {
    id: "14",
    name: "Residential Pool",
    value: 65000,
    reason: "Project delayed",
    service: "Pool Construction"
  },
  {
    id: "15",
    name: "Solar Installation",
    value: 35000,
    reason: "Changed requirements",
    service: "Solar Systems"
  }
];

const reasonData = [
  { name: "Budget constraints", value: 1 },
  { name: "Competitor selected", value: 1 },
  { name: "Project delayed", value: 1 },
  { name: "Changed requirements", value: 1 }
];

const COLORS = ['#ef4444', '#f97316', '#eab308', '#84cc16'];

const LostDealsReport = () => {
  const navigate = useNavigate();
  const totalValue = lostDeals.reduce((sum, deal) => sum + deal.value, 0);
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <AppHeader />
          <div className="p-8">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Lost Deals Analysis</h1>
              <div className="space-x-4">
                <Button variant="outline" onClick={() => navigate("/reports")}>
                  Back to Reports
                </Button>
                <Button variant="outline" onClick={() => navigate("/")}>
                  Back to Pipeline
                </Button>
              </div>
            </div>
            
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-semibold mb-2">Total Lost Value</h3>
              <p className="text-3xl font-bold text-red-600">
                ${totalValue.toLocaleString()}
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Lost Reasons Distribution</h2>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={reasonData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {reasonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Lost Value by Service</h2>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={lostDeals}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="service" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#ef4444" name="Lost Value ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Lost Deals Details</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Deal Name</th>
                      <th className="text-left p-4">Service</th>
                      <th className="text-right p-4">Value</th>
                      <th className="text-left p-4">Lost Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lostDeals.map((deal) => (
                      <tr key={deal.id} className="border-b">
                        <td className="p-4">{deal.name}</td>
                        <td className="p-4">{deal.service}</td>
                        <td className="text-right p-4">${deal.value.toLocaleString()}</td>
                        <td className="p-4">{deal.reason}</td>
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

export default LostDealsReport;