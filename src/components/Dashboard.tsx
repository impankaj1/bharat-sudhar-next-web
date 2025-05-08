"use client";

import { useState } from "react";
import { MapPin, Filter, Award, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

type IssueStatus = "pending" | "in-progress" | "resolved";

type Issue = {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  location: string;
  state: string;
  district: string;
  status: IssueStatus;
  reportDate: string;
  votes: number;
  comments: number;
  image?: string;
};

const MOCK_ISSUES: Issue[] = [
  {
    id: "1",
    title: "Deep pothole on Main Road",
    category: "infrastructure",
    subcategory: "Potholes",
    location: "Junction of MG Road and Brigade Road",
    state: "Karnataka",
    district: "Bangalore Urban",
    status: "pending",
    reportDate: "2 days ago",
    votes: 32,
    comments: 8,
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3",
  },
  {
    id: "2",
    title: "Water supply disruption in neighborhood",
    category: "water",
    subcategory: "Water Shortage",
    location: "Sector 14",
    state: "Haryana",
    district: "Gurugram",
    status: "in-progress",
    reportDate: "3 days ago",
    votes: 45,
    comments: 12,
  },
  {
    id: "3",
    title: "Garbage not collected for a week",
    category: "waste",
    subcategory: "Garbage Collection",
    location: "Adarsh Nagar",
    state: "Maharashtra",
    district: "Mumbai",
    status: "pending",
    reportDate: "1 week ago",
    votes: 28,
    comments: 6,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    id: "4",
    title: "Street light not working",
    category: "electrical",
    subcategory: "Street Lights",
    location: "Park Street",
    state: "West Bengal",
    district: "Kolkata",
    status: "resolved",
    reportDate: "2 weeks ago",
    votes: 19,
    comments: 4,
  },
  {
    id: "5",
    title: "Broken traffic signal",
    category: "public-safety",
    subcategory: "Traffic Issues",
    location: "Connaught Place",
    state: "Delhi",
    district: "New Delhi",
    status: "in-progress",
    reportDate: "4 days ago",
    votes: 37,
    comments: 9,
  },
];

export default function IssueDashboard() {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("votes");

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "infrastructure":
        return "🛣️";
      case "water":
        return "💧";
      case "waste":
        return "🗑️";
      case "electrical":
        return "💡";
      case "public-safety":
        return "⚠️";
      default:
        return "📍";
    }
  };

  const getStatusBadge = (status: IssueStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
          >
            Pending
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-200"
          >
            In Progress
          </Badge>
        );
      case "resolved":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-200"
          >
            Resolved
          </Badge>
        );
      default:
        return null;
    }
  };

  const filteredIssues = MOCK_ISSUES.filter(
    (issue) => filter === "all" || issue.status === filter
  ).sort((a, b) => {
    if (sortBy === "votes") return b.votes - a.votes;
    if (sortBy === "date")
      return (
        new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime()
      );
    return 0;
  });

  const totalIssues = MOCK_ISSUES.length;
  const pendingIssues = MOCK_ISSUES.filter(
    (i) => i.status === "pending"
  ).length;
  const inProgressIssues = MOCK_ISSUES.filter(
    (i) => i.status === "in-progress"
  ).length;
  const resolvedIssues = MOCK_ISSUES.filter(
    (i) => i.status === "resolved"
  ).length;

  const resolutionRate = Math.round((resolvedIssues / totalIssues) * 100);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIssues}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-500">
              Pending Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingIssues}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Awaiting action
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-500">
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressIssues}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Being addressed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-500">
              Resolved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedIssues}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Successfully fixed
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Resolution Progress</CardTitle>
              <CardDescription>Overall issue resolution status</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-green-500">
                {resolutionRate}% Complete
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={resolutionRate} className="h-2" />
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="text-center">
              <div className="text-sm font-medium">{pendingIssues}</div>
              <div className="text-xs text-yellow-500">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">{inProgressIssues}</div>
              <div className="text-xs text-blue-500">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-medium">{resolvedIssues}</div>
              <div className="text-xs text-green-500">Resolved</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Community Issues</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-1" />
                Map View
              </Button>
            </div>
          </div>
          <Tabs defaultValue="all" className="mt-2">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all" onClick={() => setFilter("all")}>
                All
              </TabsTrigger>
              <TabsTrigger value="pending" onClick={() => setFilter("pending")}>
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="in-progress"
                onClick={() => setFilter("in-progress")}
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger
                value="resolved"
                onClick={() => setFilter("resolved")}
              >
                Resolved
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {filteredIssues.map((issue) => (
                <div key={issue.id} className="issue-card flex overflow-hidden">
                  {issue.image && (
                    <div className="w-24 h-24 md:w-32 md:h-32 shrink-0">
                      <img
                        src={issue.image}
                        alt={issue.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="text-lg mr-2">
                            {getCategoryIcon(issue.category)}
                          </span>
                          <h3 className="font-medium">{issue.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {issue.subcategory}
                        </p>
                      </div>
                      <div>{getStatusBadge(issue.status)}</div>
                    </div>

                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <MapPin size={12} className="mr-1" />
                      <span>
                        {issue.location}, {issue.district}, {issue.state}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="text-xs text-muted-foreground">
                        Reported {issue.reportDate}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center text-xs">
                          <Award className="h-3 w-3 mr-1 text-primary" />
                          {issue.votes} votes
                        </span>
                        <span className="flex items-center text-xs">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-1"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                          {issue.comments} comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
