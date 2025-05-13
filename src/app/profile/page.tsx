"use client";

import { Award, Flag, MapPin, User, Shield, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserStore } from "@/lib/store";

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: "bronze" | "silver" | "gold" | "platinum";
  earned: boolean;
};

type IssueActivity = {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "resolved";
  date: string;
  location: string;
};

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "1",
    title: "First Report",
    description: "Report your first community issue",
    icon: "🎯",
    level: "bronze",
    earned: true,
  },
  {
    id: "2",
    title: "Change Maker",
    description: "Have 5 of your reports resolved",
    icon: "🛠️",
    level: "silver",
    earned: true,
  },
  {
    id: "3",
    title: "Vigilant Citizen",
    description: "Report 10 different issues",
    icon: "👀",
    level: "gold",
    earned: false,
  },
  {
    id: "4",
    title: "Community Champion",
    description: "Be in the top 10 contributors in your district",
    icon: "🏆",
    level: "platinum",
    earned: false,
  },
];

const USER_ACTIVITIES: IssueActivity[] = [
  {
    id: "1",
    title: "Reported pothole on MG Road",
    status: "resolved",
    date: "2 days ago",
    location: "Bangalore, Karnataka",
  },
  {
    id: "2",
    title: "Reported water shortage in neighborhood",
    status: "in-progress",
    date: "1 week ago",
    location: "Bangalore, Karnataka",
  },
  {
    id: "3",
    title: "Reported street light not working",
    status: "resolved",
    date: "2 weeks ago",
    location: "Bangalore, Karnataka",
  },
];

export default function UserProfile() {
  const user = useUserStore((state) => state.user);
  console.log("user", user);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600";
      case "in-progress":
        return "text-blue-600";
      case "resolved":
        return "text-green-600";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 border-4 border-primary overflow-clip object-contain">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="User"
                />
                <AvatarFallback>RP</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mt-2">Rahul Patel</h2>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <MapPin size={14} />
                <span>Bangalore, Karnataka</span>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-muted rounded-md">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-muted-foreground">
                    Issues Reported
                  </div>
                </div>
                <div className="text-center p-3 bg-muted rounded-md">
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-xs text-muted-foreground">
                    Issues Resolved
                  </div>
                </div>
                <div className="text-center p-3 bg-muted rounded-md">
                  <div className="text-2xl font-bold">245</div>
                  <div className="text-xs text-muted-foreground">
                    Impact Points
                  </div>
                </div>
                <div className="text-center p-3 bg-muted rounded-md">
                  <div className="text-2xl font-bold">#7</div>
                  <div className="text-xs text-muted-foreground">
                    District Rank
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-sm font-medium">Level Progress</div>
                    <div className="text-xs text-muted-foreground">
                      245/300 to next level
                    </div>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="badge-gold">
                    <Star className="h-3 w-3 mr-1" />
                    <span>Level 7</span>
                  </div>
                  <div className="badge-platinum">
                    <Shield className="h-3 w-3 mr-1" />
                    <span>Verified</span>
                  </div>
                  <div className="badge-silver">
                    <Flag className="h-3 w-3 mr-1" />
                    <span>Change Maker</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="activity">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-medium">Recent Activity</h3>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                {USER_ACTIVITIES.map((activity) => (
                  <div
                    key={activity.id}
                    className="mb-4 pb-4 border-b last:border-0"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{activity.title}</h4>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <MapPin size={12} className="mr-1" />
                          <span>{activity.location}</span>
                          <span className="mx-2">•</span>
                          <span>{activity.date}</span>
                        </div>
                      </div>
                      <div
                        className={`text-sm font-medium ${getStatusColor(
                          activity.status
                        )}`}
                      >
                        {activity.status.charAt(0).toUpperCase() +
                          activity.status.slice(1)}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-medium">Your Achievements</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${
                      achievement.earned
                        ? "border-primary bg-primary/5"
                        : "opacity-60"
                    }`}
                  >
                    <div className="flex">
                      <div className="text-2xl mr-3">{achievement.icon}</div>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        <div
                          className={`mt-2 text-xs font-medium inline-flex px-2 py-1 rounded ${
                            achievement.level === "bronze"
                              ? "bg-orange-100 text-orange-800"
                              : achievement.level === "silver"
                              ? "bg-gray-100 text-gray-800"
                              : achievement.level === "gold"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {achievement.level.charAt(0).toUpperCase() +
                            achievement.level.slice(1)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-medium">Profile Settings</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Name</label>
                  <input
                    type="text"
                    defaultValue="Rahul Patel"
                    className="w-full rounded-md border p-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    defaultValue="rahul.p@example.com"
                    className="w-full rounded-md border p-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+91 98765 43210"
                    className="w-full rounded-md border p-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <input
                    type="text"
                    defaultValue="Bangalore, Karnataka"
                    className="w-full rounded-md border p-2"
                  />
                </div>
                <Button className="w-full">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
