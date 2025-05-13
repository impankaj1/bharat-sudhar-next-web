"use client";

import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateProfileDialog } from "@/components/CreateProfileDialog";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="border-white text-secondary hover:text-white hover:bg-secondary-foreground/10"
        >
          Create Profile
        </Button>
      </DialogTrigger>
      <CreateProfileDialog open={open} onOpenChange={setOpen} />
    </Dialog>
  );
}