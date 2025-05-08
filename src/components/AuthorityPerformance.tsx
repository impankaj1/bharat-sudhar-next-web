import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Authority } from "@/types/models";
import { User } from "lucide-react";

// Mocked authorities data
const MOCK_AUTHORITIES: Authority[] = [
  {
    id: "auth1",
    name: "Rajesh Kumar",
    position: "MLA",
    department: "State Legislature",
    district: "Bangalore Urban",
    state: "Karnataka",
    issuesSolved: 45,
    issuesPending: 23,
    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    id: "auth2",
    name: "Priya Singh",
    position: "Municipal Commissioner",
    department: "Municipal Corporation",
    district: "Bangalore Urban",
    state: "Karnataka",
    issuesSolved: 67,
    issuesPending: 15,
    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    id: "auth3",
    name: "Amit Patel",
    position: "District Collector",
    department: "District Administration",
    district: "Bangalore Urban",
    state: "Karnataka",
    issuesSolved: 32,
    issuesPending: 28,
  },
];

const AuthorityPerformance: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2 h-5 w-5 text-primary" />
          Authority Performance
        </CardTitle>
        <CardDescription>
          Track how officials are addressing community issues
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {MOCK_AUTHORITIES.map((authority) => {
            const totalIssues =
              authority.issuesSolved + authority.issuesPending;
            const resolutionRate = Math.round(
              (authority.issuesSolved / totalIssues) * 100
            );

            return (
              <div key={authority.id} className="space-y-2">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {authority.profileImage ? (
                      <img
                        src={authority.profileImage}
                        alt={authority.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 m-2 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{authority.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {authority.position}, {authority.department}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium">
                          {resolutionRate}%
                        </span>
                        <p className="text-xs text-muted-foreground">
                          Resolution rate
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={resolutionRate} className="h-2" />
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>Resolved: {authority.issuesSolved}</span>
                        <span>Pending: {authority.issuesPending}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthorityPerformance;
