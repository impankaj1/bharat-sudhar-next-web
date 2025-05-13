"use client";

import { useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/lib/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EmergencyContact {
  name: string;
  phoneNumber: string;
  relationship: string;
}

interface CreateProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProfileDialog({ open, onOpenChange }: CreateProfileDialogProps) {
  const { toast } = useToast();
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    state: "",
    district: "",
    location: {
      coordinates: [0, 0],
      address: "",
    },
    emergencyContacts: [] as EmergencyContact[],
  });

  const [emergencyContact, setEmergencyContact] = useState<EmergencyContact>({
    name: "",
    phoneNumber: "",
    relationship: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const handleEmergencyContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmergencyContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addEmergencyContact = () => {
    if (emergencyContact.name && emergencyContact.phoneNumber && emergencyContact.relationship) {
      setFormData((prev) => ({
        ...prev,
        emergencyContacts: [...prev.emergencyContacts, emergencyContact],
      }));
      setEmergencyContact({
        name: "",
        phoneNumber: "",
        relationship: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:27017/auth/user/create", formData);
      setUser(response.data);
      toast({
        title: "Success",
        description: "Profile created successfully!",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Profile</DialogTitle>
          <DialogDescription>
            Fill in your details to create your profile
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number *</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Select
                value={formData.state}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, state: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {/* Add Indian states here */}
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  {/* Add more states */}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">District *</Label>
              <Input
                id="district"
                name="district"
                required
                value={formData.district}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input
              id="address"
              name="address"
              required
              value={formData.location.address}
              onChange={handleLocationChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Emergency Contact</Label>
            <div className="space-y-2">
              <Input
                placeholder="Contact Name"
                name="name"
                value={emergencyContact.name}
                onChange={handleEmergencyContactChange}
              />
              <Input
                placeholder="Contact Phone"
                name="phoneNumber"
                value={emergencyContact.phoneNumber}
                onChange={handleEmergencyContactChange}
              />
              <Input
                placeholder="Relationship"
                name="relationship"
                value={emergencyContact.relationship}
                onChange={handleEmergencyContactChange}
              />
              <Button
                type="button"
                variant="outline"
                onClick={addEmergencyContact}
              >
                Add Emergency Contact
              </Button>
            </div>
            {formData.emergencyContacts.length > 0 && (
              <div className="mt-2">
                <Label>Added Contacts:</Label>
                <ul className="list-disc pl-4">
                  {formData.emergencyContacts.map((contact, index) => (
                    <li key={index}>
                      {contact.name} ({contact.relationship})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Profile"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}