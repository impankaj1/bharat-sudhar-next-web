import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award, BellRing, Flag, MapPin, Shield } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const featuredIssues = [
    {
      title: "Water supply disruption in Koramangala",
      location: "Koramangala, Bangalore",
      votes: 42,
      status: "in-progress",
    },
    {
      title: "Pothole causing accidents on NH8",
      location: "Gurugram, Haryana",
      votes: 78,
      status: "pending",
    },
    {
      title: "Garbage collection irregular in Sector 21",
      location: "Sector 21, Noida",
      votes: 36,
      status: "resolved",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/80 to-primary text-white pt-16 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Make Your Voice Heard
                </h1>
                <p className="text-lg mb-8">
                  Report civic issues in your community and track their
                  resolution. Join the movement for a better India, one issue at
                  a time.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Link href="/report">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full sm:w-auto"
                    >
                      <Flag className="mr-2 h-5 w-5" />
                      Report an Issue
                    </Button>
                  </Link>
                  <Link href="/alerts">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto bg-primary-foreground/10 text-white hover:bg-primary-foreground/20 border-white"
                    >
                      <BellRing className="mr-2 h-5 w-5" />
                      Emergency Alerts
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                  alt="Community"
                  className="w-3/4 rounded-lg shadow-2xl transform rotate-3 border-4 border-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-10 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-3xl font-bold text-primary">5,280+</div>
                <div className="text-sm text-muted-foreground">
                  Issues Reported
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-3xl font-bold text-green-500">68%</div>
                <div className="text-sm text-muted-foreground">
                  Resolution Rate
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-3xl font-bold text-secondary">12K+</div>
                <div className="text-sm text-muted-foreground">
                  Active Citizens
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-3xl font-bold text-accent">250+</div>
                <div className="text-sm text-muted-foreground">
                  Districts Covered
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Issues */}
        <section className="py-10 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-2">Featured Issues</h2>
              <p className="text-muted-foreground">
                Recent issues reported by citizens across India
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {featuredIssues.map((issue, index) => (
                <Card key={index} className="issue-card">
                  <div
                    className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                      issue.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : issue.status === "in-progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {issue.status === "pending"
                      ? "Pending"
                      : issue.status === "in-progress"
                      ? "In Progress"
                      : "Resolved"}
                  </div>
                  <CardHeader>
                    <CardTitle>{issue.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" /> {issue.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-primary mr-1" />
                      <span className="text-sm">
                        {issue.votes} citizens voted
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Link href="/dashboard">
                <Button variant="outline">View All Issues</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold mb-2">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                JanAwaaz makes it easy to report civic issues and track their
                resolution
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Report an Issue</h3>
                <p className="text-muted-foreground">
                  Take a photo or video of the issue, select the category and
                  provide location details.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Track Progress</h3>
                <p className="text-muted-foreground">
                  Follow the status of reported issues and see how authorities
                  are addressing them.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Earn Recognition</h3>
                <p className="text-muted-foreground">
                  Get badges and rewards for your contributions to community
                  improvement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Alert Section */}
        <section className="py-12 px-4 bg-red-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <div className="flex items-center mb-4">
                  <Shield className="h-10 w-10 text-red-500 mr-3" />
                  <h2 className="text-3xl font-bold">Emergency Alerts</h2>
                </div>
                <p className="text-lg mb-6">
                  Stay informed about emergencies in your area including natural
                  disasters, accidents, and safety concerns. Get real-time
                  notifications.
                </p>
                <Link href="/alerts">
                  <Button variant="destructive" size="lg">
                    <BellRing className="mr-2 h-5 w-5" />
                    View Current Alerts
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <div className="alert-emergency mb-4">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    <span className="font-bold">Flash Flood Warning</span>
                  </div>
                  <p className="mt-1">
                    Heavy rainfall causing flash floods in low-lying areas of
                    Mumbai. Please stay indoors.
                  </p>
                </div>
                <div className="alert-warning">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    <span className="font-bold">Water Supply Disruption</span>
                  </div>
                  <p className="mt-1">
                    Scheduled maintenance will affect water supply in North
                    Delhi for 6 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-gradient-to-r from-secondary to-secondary/80 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Join the Movement for a Better India
            </h2>
            <p className="text-xl mb-8">
              Be the change you want to see in your community. Start reporting
              issues today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/report">
                <Button
                  size="lg"
                  variant="default"
                  className="bg-white border-white  text-secondary  hover:text-white hover:bg-secondary-foreground/10"
                >
                  Get Started Now
                </Button>
              </Link>
              <Link href="/profile">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-secondary hover:text-white hover:bg-secondary-foreground/10"
                >
                  Create Profile
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <BellRing className="h-6 w-6 text-secondary mr-2" />
                <span className="text-xl font-bold">JanAwaaz</span>
              </div>
              <p className="text-muted-foreground">
                Empowering citizens to improve their communities through
                reporting and tracking civic issues.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/report"
                    className="text-muted-foreground hover:text-white"
                  >
                    Report Issue
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-muted-foreground hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/alerts"
                    className="text-muted-foreground hover:text-white"
                  >
                    Alerts
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-muted-foreground">
                support@janawaaz.org
                <br />
                +91 12345 67890
              </p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} JanAwaaz. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
