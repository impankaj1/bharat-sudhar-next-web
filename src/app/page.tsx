// Update the Create Profile button in the Call to Action section
// Replace the existing Link component with:

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