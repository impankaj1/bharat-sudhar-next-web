import NearbyIssues from "@/components/NearbyIssues";
import AuthorityPerformance from "@/components/AuthorityPerformance";
import IssueDashboard from "@/components/Dashboard";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
      <IssueDashboard />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NearbyIssues />
        <AuthorityPerformance />
      </div>
    </div>
  );
}
