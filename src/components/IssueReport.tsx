"use client";

import { useState } from "react";
import { Camera, MapPin, Flag, AlertTriangle, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { toast } from "react-toastify";
import { useReportStore } from "@/lib/store";

export const ISSUE_CATEGORIES = [
  {
    value: "infrastructure",
    label: "Infrastructure",
    subcategories: [
      "Potholes",
      "Broken Sidewalks",
      "Street Lights",
      "Drainage",
    ],
  },
  {
    value: "water",
    label: "Water",
    subcategories: [
      "Water Shortage",
      "Contaminated Water",
      "Leakage",
      "Flooding",
    ],
  },
  {
    value: "waste",
    label: "Waste Management",
    subcategories: [
      "Garbage Collection",
      "Illegal Dumping",
      "Overflowing Bins",
      "Sewage",
    ],
  },
  {
    value: "electrical",
    label: "Electrical",
    subcategories: ["Power Outage", "Fallen Lines", "Electric Hazards"],
  },
  {
    value: "public-safety",
    label: "Public Safety",
    subcategories: ["Unsafe Areas", "Missing Signals", "Traffic Issues"],
  },
];

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

// Mock authorities data - in a real app, this would come from an API
const MOCK_AUTHORITIES = [
  {
    id: "auth1",
    name: "Municipal Commissioner",
    department: "Municipal Corporation",
  },
  {
    id: "auth2",
    name: "District Collector",
    department: "District Administration",
  },
  { id: "auth3", name: "Local MLA", department: "Legislative Assembly" },
  {
    id: "auth4",
    name: "Water Department Head",
    department: "Water Supply Department",
  },
  {
    id: "auth5",
    name: "Electricity Board Officer",
    department: "Electricity Board",
  },
  {
    id: "auth6",
    name: "Public Works Engineer",
    department: "Public Works Department",
  },
  {
    id: "auth7",
    name: "Health Officer",
    department: "Public Health Department",
  },
];

const IssueReport = () => {
  const [issueData, setIssueData] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    state: "",
    district: "",
    location: "",
    isUrgent: false,
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [media, setMedia] = useState<{ preview: string; type: string } | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [taggedAuthorities, setTaggedAuthorities] = useState<string[]>([]);
  const setReport = useReportStore((state) => state.setReport);
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setIssueData((prev) => ({ ...prev, category: value, subcategory: "" }));

    // Suggest relevant authorities based on category
    suggestAuthoritiesForCategory(value);
  };

  const suggestAuthoritiesForCategory = (category: string) => {
    // This would ideally come from an API based on the category and location
    // For now, we'll just suggest some relevant authorities based on the category
    let suggestedAuthorities: string[] = [];

    switch (category) {
      case "infrastructure":
      case "public-safety":
        suggestedAuthorities = ["auth1", "auth3", "auth6"];
        break;
      case "water":
        suggestedAuthorities = ["auth2", "auth4"];
        break;
      case "electrical":
        suggestedAuthorities = ["auth5"];
        break;
      case "waste":
        suggestedAuthorities = ["auth1", "auth7"];
        break;
      default:
        suggestedAuthorities = [];
    }

    setTaggedAuthorities(suggestedAuthorities);
  };

  const handleSubcategoryChange = (value: string) => {
    setIssueData((prev) => ({ ...prev, subcategory: value }));
  };

  const handleStateChange = (value: string) => {
    setIssueData((prev) => ({ ...prev, state: value, district: "" }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setIssueData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileType = file.type.startsWith("image/") ? "image" : "video";

      setMedia({
        preview: URL.createObjectURL(file),
        type: fileType,
      });
    }
  };

  // const handleUrgentToggle = () => {
  //   setIssueData((prev) => ({ ...prev, isUrgent: !prev.isUrgent }));
  // };

  const handleAuthoritySelection = (authorityId: string) => {
    setTaggedAuthorities((prev) => {
      if (prev.includes(authorityId)) {
        return prev.filter((id) => id !== authorityId);
      }
      return [...prev, authorityId];
    });
  };

  const getAuthorityById = (id: string) => {
    return MOCK_AUTHORITIES.find((authority) => authority.id === id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/create`,
        issueData
      );
      if (response.data.success) {
        toast("Issue Reported Successfully");
        setReport(issueData);
      }
    } catch (error) {
      toast("Failed to create report. Please try again.");
    } finally {
      setSubmitting(false);
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/create`,
      issueData
    );
    if (response.data.success) {
      toast("Issue Reported Successfully");
      setReport(issueData);
    }
  };

  const subcategories =
    ISSUE_CATEGORIES.find((cat) => cat.value === selectedCategory)
      ?.subcategories || [];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Flag className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Report an Issue</h2>
        </div>
        <p className="text-muted-foreground">
          Help improve your community by reporting local issues
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Issue Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Briefly describe the issue"
              value={issueData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Issue Categories</SelectLabel>
                    {ISSUE_CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* <div className="space-y-2">
              <Label>Subcategory</Label>
              <Select
                disabled={!selectedCategory}
                onValueChange={handleSubcategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Subcategories</SelectLabel>
                    {subcategories.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>State</Label>
              <Select onValueChange={handleStateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>States</SelectLabel>
                    {INDIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                name="district"
                placeholder="Enter district"
                value={issueData.district}
                onChange={handleChange}
                disabled={!issueData.state}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Specific Location</Label>
            <div className="flex">
              <Input
                id="location"
                name="location"
                placeholder="Enter specific address/location"
                value={issueData.location}
                onChange={handleChange}
                className="flex-1"
                required
              />
              {/* <Button
                type="button"
                variant="outline"
                size="icon"
                className="ml-2"
                onClick={() => {
                  toast("Getting your current location...");
                }}
              >
                <MapPin className="h-4 w-4" />
              </Button> */}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the issue in detail"
              rows={4}
              value={issueData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Tag Authorities Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Tag Relevant Authorities</Label>
              <span className="text-xs text-muted-foreground">
                {taggedAuthorities.length} selected
              </span>
            </div>

            <div className="border rounded-md p-3 space-y-3">
              <p className="text-sm text-muted-foreground">
                Based on the issue category, we suggest tagging these
                authorities:
              </p>

              <div className="grid grid-cols-1 gap-2">
                {MOCK_AUTHORITIES.map((authority) => (
                  <div
                    key={authority.id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id={`authority-${authority.id}`}
                      checked={taggedAuthorities.includes(authority.id)}
                      onChange={() => handleAuthoritySelection(authority.id)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label
                      htmlFor={`authority-${authority.id}`}
                      className="flex flex-col cursor-pointer items-start "
                    >
                      <span className="font-medium">{authority.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {authority.department}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {taggedAuthorities.map((authId) => {
                  const authority = getAuthorityById(authId);
                  return (
                    authority && (
                      <Badge
                        key={authId}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Tag className="h-3 w-3" />
                        {authority.name}
                      </Badge>
                    )
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Add Media Evidence</Label>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-4">
                {media ? (
                  <div className="relative w-full">
                    {media.type === "image" ? (
                      <img
                        src={media.preview}
                        alt="Evidence"
                        className="mx-auto h-48 object-contain"
                      />
                    ) : (
                      <video
                        src={media.preview}
                        controls
                        className="mx-auto h-48"
                      />
                    )}
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-0 right-0 rounded-full"
                      onClick={() => setMedia(null)}
                    >
                      X
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 cursor-pointer">
                    <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">
                      Upload photo/video
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      (Click to browse)
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,video/*"
                      onChange={handleMediaChange}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* <div className="flex items-center space-x-2">
            <button
              type="button"
              className={`p-2 rounded-md ${
                issueData.isUrgent
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={handleUrgentToggle}
            >
              <AlertTriangle className="h-5 w-5" />
            </button>
            <span>Mark as urgent issue</span>
          </div> */}
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          type="submit"
          disabled={submitting}
          onClick={handleSubmit}
          className="w-full sm:w-auto"
        >
          {submitting ? "Submitting..." : "Submit Report"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IssueReport;
