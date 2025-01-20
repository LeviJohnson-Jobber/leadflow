import { useNavigate } from "react-router-dom";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppHeader } from "@/components/AppHeader";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const data = [
  { stage: 'New', count: 2, conversionRate: 85 },
  { stage: 'Contacted', count: 3, conversionRate: 75 },
  { stage: 'Follow-Up', count: 4, conversionRate: 60 },
  { stage: 'Quoted', count: 3, conversionRate: 45 },
  { stage: 'Negotiation', count: 2, conversionRate: 30 },
];

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
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stage" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#4f46e5" name="Number of Leads" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Conversion Rate by Stage</h2>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stage" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="conversionRate" 
                        stroke="#4f46e5" 
                        name="Conversion Rate (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
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