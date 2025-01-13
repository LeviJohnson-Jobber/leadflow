import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";

const PipelineSettings = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <AppHeader />
          <div className="bg-gradient-to-b from-slate-100 to-white p-4">
            <div className="h-full">
              <h1 className="text-2xl font-bold text-gray-900">Customize Pipeline</h1>
              {/* Pipeline settings content will go here */}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PipelineSettings;