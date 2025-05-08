"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Award } from "lucide-react";
import { Issue, IssueStatus } from "@/types/models";
import { ScrollArea } from "./ui/scroll-area";

// Mocked nearby issues data
const MOCK_NEARBY_ISSUES: Issue[] = [
  {
    id: "6",
    title: "Street lights not working in JP Nagar",
    category: "electrical",
    subcategory: "Street Lights",
    location: "JP Nagar 6th Phase",
    state: "Karnataka",
    district: "Bangalore",
    status: "pending",
    reportDate: "1 day ago",
    votes: 18,
    comments: 4,
    latitude: 12.912,
    longitude: 77.593,
    taggedAuthorities: ["auth1", "auth3"],
  },
  {
    id: "7",
    title: "Water supply disruption in HSR Layout",
    category: "water",
    subcategory: "Water Shortage",
    location: "HSR Layout Sector 1",
    state: "Karnataka",
    district: "Bangalore",
    status: "pending",
    reportDate: "5 hours ago",
    votes: 27,
    comments: 12,
    latitude: 12.9116,
    longitude: 77.6741,
    taggedAuthorities: ["auth2"],
  },
  {
    id: "8",
    title: "Overflowing garbage bin",
    category: "waste",
    subcategory: "Garbage Collection",
    location: "Indiranagar 12th Main",
    state: "Karnataka",
    district: "Bangalore",
    status: "in-progress",
    reportDate: "2 days ago",
    votes: 35,
    comments: 8,
    image: "https://images.unsplash.com/photo-1621451651659-fd172ebe0d60",
    latitude: 12.9784,
    longitude: 77.6408,
    taggedAuthorities: ["auth1", "auth2"],
  },
];

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

export default function NearbyIssues() {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredIssues = filter
    ? MOCK_NEARBY_ISSUES.filter((issue) => issue.category === filter)
    : MOCK_NEARBY_ISSUES;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-primary" />
          Issues Near You
        </CardTitle>
        <CardDescription>
          Recent issues reported in your vicinity
        </CardDescription>

        <div className="flex flex-wrap gap-2 mt-2">
          <Button
            variant={filter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(null)}
          >
            All
          </Button>
          <Button
            variant={filter === "water" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("water")}
          >
            Water
          </Button>
          <Button
            variant={filter === "electrical" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("electrical")}
          >
            Electrical
          </Button>
          <Button
            variant={filter === "waste" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("waste")}
          >
            Waste
          </Button>
        </div>
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
                    <span>{issue.location}</span>
                  </div>

                  <div className="mt-2 text-xs">
                    <span className="text-primary font-medium">
                      Tagged authorities:
                    </span>
                    <span className="ml-1">
                      Municipal Corporation, {issue.district} District Officer
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
