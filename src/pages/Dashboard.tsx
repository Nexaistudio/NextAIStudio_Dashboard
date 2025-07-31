import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardWidgets } from "@/components/dashboard/DashboardWidgets";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Let's create something amazing today.</p>
        </div>
        <DashboardWidgets />
      </div>
    </DashboardLayout>
  );
}