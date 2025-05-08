"use client";

import { useState } from "react";
import { Bell, BellRing, MapPin, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

type Alert = {
  id: string;
  type: "emergency" | "warning" | "info";
  title: string;
  description: string;
  location: string;
  date: string;
  isNew: boolean;
};

const SAMPLE_ALERTS: Alert[] = [
  {
    id: "1",
    type: "emergency",
    title: "Flash Flood Warning",
    description:
      "Heavy rainfall causing flash floods in low-lying areas. Avoid travel and stay in safe locations.",
    location: "Mumbai, Maharashtra",
    date: "2 hours ago",
    isNew: true,
  },
  {
    id: "2",
    type: "warning",
    title: "Water Supply Disruption",
    description:
      "Scheduled maintenance will disrupt water supply for 6 hours. Store water for essential use.",
    location: "Sector 14, Gurugram",
    date: "5 hours ago",
    isNew: true,
  },
  {
    id: "3",
    type: "info",
    title: "Road Closure Notice",
    description:
      "MG Road closed for repairs from KR Circle to Trinity Circle. Use alternate routes.",
    location: "Bangalore, Karnataka",
    date: "1 day ago",
    isNew: false,
  },
  {
    id: "4",
    type: "warning",
    title: "Heatwave Advisory",
    description:
      "Extreme temperatures expected. Stay hydrated and avoid outdoor activities during peak hours.",
    location: "Jaipur, Rajasthan",
    date: "1 day ago",
    isNew: false,
  },
  {
    id: "5",
    type: "info",
    title: "Public Transportation Strike",
    description:
      "Bus and auto unions on strike today. Plan alternative transportation.",
    location: "Chennai, Tamil Nadu",
    date: "2 days ago",
    isNew: false,
  },
];

export default function EmergencyAlert() {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>(SAMPLE_ALERTS);
  const [alertSettings, setAlertSettings] = useState({
    emergency: true,
    safety: true,
    infrastructure: true,
    weather: true,
    notification: {
      push: true,
      email: false,
      sms: true,
    },
    radius: 10, // km
  });

  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, isNew: false })));
    toast({
      title: "All alerts marked as read",
    });
  };

  const toggleNotification = (
    type: keyof typeof alertSettings.notification
  ) => {
    setAlertSettings((prev) => ({
      ...prev,
      notification: {
        ...prev.notification,
        [type]: !prev.notification[type],
      },
    }));
  };

  const toggleAlertType = (type: keyof typeof alertSettings) => {
    if (type in alertSettings && typeof alertSettings[type] === "boolean") {
      setAlertSettings((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
    }
  };

  const AlertCard = ({ alert }: { alert: Alert }) => (
    <div
      className={`mb-4 p-4 rounded-lg border ${
        alert.type === "emergency"
          ? "border-l-4 border-l-red-500 bg-red-50"
          : alert.type === "warning"
          ? "border-l-4 border-l-yellow-500 bg-yellow-50"
          : "border-l-4 border-l-blue-500 bg-blue-50"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-2">
          {alert.isNew && (
            <span className="w-2 h-2 mt-2 rounded-full bg-blue-600 pulse-animation" />
          )}
          <div>
            <h4 className="font-semibold">{alert.title}</h4>
            <p className="text-sm text-gray-600">{alert.description}</p>
            <div className="flex items-center mt-2 text-xs text-muted-foreground">
              <MapPin size={12} className="mr-1" />
              <span>{alert.location}</span>
              <span className="mx-2">•</span>
              <span>{alert.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BellRing className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Alerts & Notifications</h2>
          </div>
          {alerts.some((a) => a.isNew) && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="alerts">
          <TabsList className="w-full">
            <TabsTrigger value="alerts" className="flex-1">
              Active Alerts
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1">
              Alert Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="alerts" className="pt-4">
            <ScrollArea className="h-[550px] overflow-y-scroll">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-40">
                  <Bell className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No active alerts</p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="settings" className="pt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Alert Types</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="emergency"
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Shield className="h-4 w-4 text-red-500" />
                      <span>Emergency Alerts</span>
                    </Label>
                    <Switch
                      id="emergency"
                      checked={alertSettings.emergency}
                      onCheckedChange={() => toggleAlertType("emergency")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="safety"
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Shield className="h-4 w-4 text-orange-500" />
                      <span>Safety Alerts</span>
                    </Label>
                    <Switch
                      id="safety"
                      checked={alertSettings.safety}
                      onCheckedChange={() => toggleAlertType("safety")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="infrastructure"
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span>Infrastructure Alerts</span>
                    </Label>
                    <Switch
                      id="infrastructure"
                      checked={alertSettings.infrastructure}
                      onCheckedChange={() => toggleAlertType("infrastructure")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="weather"
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <Shield className="h-4 w-4 text-yellow-500" />
                      <span>Weather Alerts</span>
                    </Label>
                    <Switch
                      id="weather"
                      checked={alertSettings.weather}
                      onCheckedChange={() => toggleAlertType("weather")}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Notification Settings
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push" className="cursor-pointer">
                      Push Notifications
                    </Label>
                    <Switch
                      id="push"
                      checked={alertSettings.notification.push}
                      onCheckedChange={() => toggleNotification("push")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email" className="cursor-pointer">
                      Email Notifications
                    </Label>
                    <Switch
                      id="email"
                      checked={alertSettings.notification.email}
                      onCheckedChange={() => toggleNotification("email")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms" className="cursor-pointer">
                      SMS Notifications
                    </Label>
                    <Switch
                      id="sms"
                      checked={alertSettings.notification.sms}
                      onCheckedChange={() => toggleNotification("sms")}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Location Settings</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Receive alerts for issues within this radius from your
                  location
                </p>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={alertSettings.radius}
                    onChange={(e) =>
                      setAlertSettings((prev) => ({
                        ...prev,
                        radius: parseInt(e.target.value),
                      }))
                    }
                    className="flex-1"
                  />
                  <span className="w-12 text-right">
                    {alertSettings.radius} km
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-3">
        <Button
          variant="outline"
          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => {
            toast({
              title: "SOS Feature",
              description: "This feature will be available in the next update.",
              variant: "destructive",
            });
          }}
        >
          <Shield className="mr-2 h-4 w-4" />
          SOS Emergency Alert
        </Button>
      </CardFooter>
    </Card>
  );
}
