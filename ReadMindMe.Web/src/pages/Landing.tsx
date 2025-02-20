import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Zap,
  Shield,
  Globe,
  Heart,
  Lightbulb,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

export default function LandingPage() {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Vibrant Community",
      description: "Connect with like-minded individuals on their spiritual journey."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Daily Inspiration",
      description: "Access daily devotionals and spiritual content to nourish your soul."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Meaningful Discussions",
      description: "Engage in deep, thoughtful conversations about faith and life."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Personal Growth",
      description: "Track your spiritual progress and set meaningful goals."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe Space",
      description: "A moderated platform ensuring respectful and uplifting interactions."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Perspective",
      description: "Connect with believers from around the world and broaden your understanding."
    }
  ];
  return (
    <div className="flex font-karla flex-col min-h-screen">
      <header className="px-5 sticky top-0 z-50 w-full border-b bg-[#F5F2EE]  backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex px-2 h-14 items-center">
          <Link className="flex items-center justify-center" to="/">
            <BookOpen className="h-6 w-6 mr-2" />
            <span className="font-bold italic text-xl">ReadMindMe</span>
          </Link>
          <nav className="ml-auto flex justify-around sm:gap-6">
            <a
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#features"
            >
              Features
            </a>
            <a
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#how-it-works"
            >
              How It Works
            </a>
            <a
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#benefits"
            >
              Benefits
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 text-neutral-800">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48  bg-[#CFA999] dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-[#F5F2EE] tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Unlock Your Spiritual Potential with ReadMindMe
                </h1>
                <p className="mx-auto max-w-[700px] text-white font-light italic md:text-xl dark:text-gray-400">
                  Connect, share, and grow in your faith journey. Join our free
                  community and experience a new way of spiritual growth.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link className="px-2 py-3 underline underline-offset-2 text-black" to="/login">
                  Sign in
                </Link>
                <p className="text-xs text-primary dark:text-gray-400">
                  dont have account?{" "}
                  <a className="underline text-red-700 underline-offset-4" href="#register">
                    Register
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"

        >
        <div className="bg-[#FDF5E6] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[#8B4513] mb-12">
          Why Choose ReadMindMe?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Features List */}
          <div className="space-y-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start  p-4 "
              >
                <div className=" text-[#C17817]">
                  {feature.icon}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-lg text-[#8B4513]">
                    {feature.title}
                  </h3>
                  <p className="text-[#5C4033] mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Illustration */}
          <div className="relative">
           <img className="" height={80} width={600} src={"/why-readmindme.jpg"}/>
          </div>
        </div>
      </div>
    </div>
        </section>
        <section
          id="how-it-works"
          className="w-full bg-[#F5F2EE] py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How ReadMindMe Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-neutral-600 text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    1
                  </div>
                </div>
                <h3 className="text-xl font-bold">Sign Up</h3>
                <p className="text-muted-foreground">
                  Create your free account in seconds. No credit card required.
                  Join our welcoming community of spiritual seekers.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mt-2">
                  <li>Quick registration process</li>
                  <li>Personalize your profile</li>
                  <li>Set your preferences</li>
                </ul>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-neutral-700 text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    2
                  </div>
                </div>
                <h3 className="text-xl font-bold">Explore</h3>
                <p className="text-muted-foreground">
                  Discover inspiring content, join groups, and connect with
                  others who share your spiritual journey.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mt-2">
                  <li>Daily devotionals</li>
                  <li>Community discussions</li>
                  <li>Prayer groups</li>
                </ul>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-800 text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold">Grow</h3>
                <p className="text-muted-foreground">
                  Engage in discussions, set spiritual goals, and track your
                  journey of faith and personal growth.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mt-2">
                  <li>Track your progress</li>
                  <li>Share your insights</li>
                  <li>Build lasting connections</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section
          id="benefits"
          className="w-full py-12 md:py-24 lg:py-32 bg-[#f5f3f0] dark:bg-gray-800/50"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What You'll Gain
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <TrendingUp className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Spiritual Growth</h3>
                  <p className="text-muted-foreground">
                    Deepen your faith and understanding through daily
                    devotionals, guided discussions, and personal reflection
                    tools.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Users className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Meaningful Connections</h3>
                  <p className="text-muted-foreground">
                    Build lasting relationships with like-minded individuals who
                    support and encourage your spiritual journey.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Heart className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Emotional Support</h3>
                  <p className="text-muted-foreground">
                    Find comfort, encouragement, and prayer support from a
                    caring community during life's ups and downs.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Lightbulb className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Expanded Perspective</h3>
                  <p className="text-muted-foreground">
                    Gain insights from diverse viewpoints and experiences,
                    broadening your understanding of faith and spirituality.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Zap className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Personal Accountability</h3>
                  <p className="text-muted-foreground">
                    Stay motivated and on track with your spiritual goals
                    through our progress tracking and community support
                    features.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Globe className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Global Faith Community</h3>
                  <p className="text-muted-foreground">
                    Connect with believers worldwide, sharing experiences and
                    insights that enrich your spiritual life.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="register"
          className="w-full py-12 md:py-24 lg:py-32 bg-[#9F5434] text-primary"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Ready to Start Your Journey?
              </h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                Join ReadMindMe today and experience a new way of connecting,
                sharing, and growing in your faith.
              </p>
              <Link
                className={buttonVariants({ variant: "secondary", size: "lg" })}
                to="/register"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex  flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 ReadMindMe. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Contact Us
          </Link>
        </nav>
      </footer>
    </div>
  );
}
