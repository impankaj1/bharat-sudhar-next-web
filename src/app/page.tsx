import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateProfileDialog } from "@/components/CreateProfileDialog";

export default function Home() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="border-white text-secondary hover:text-white hover:bg-secondary-foreground/10"
        >
          Create Profile
        </Button>
      </DialogTrigger>
      <CreateProfileDialog />
    </Dialog>
  );
}