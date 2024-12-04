import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {  MessageSquare, User } from "lucide-react";

interface Post {
  id: number;
  content: string;
  likes: number;
  comments: number;
  date: string;
}

interface Activity {
  id: number;
  type: "joined" | "posted" | "commented";
  content: string;
  date: string;
}

export default function ProfilePage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      content: "Just finished my daily devotional. Feeling blessed!",
      likes: 15,
      comments: 3,
      date: "2023-06-01",
    },
    {
      id: 2,
      content: "Prayer request: Please keep my family in your thoughts.",
      likes: 25,
      comments: 10,
      date: "2023-05-28",
    },
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: "joined",
      content: "Joined the 'Daily Prayer' community",
      date: "2023-06-02",
    },
    {
      id: 2,
      type: "posted",
      content: "Created a new post in 'Faith Discussions'",
      date: "2023-05-30",
    },
    {
      id: 3,
      type: "commented",
      content: "Commented on John's prayer request",
      date: "2023-05-29",
    },
  ]);

  const tabs = [
    { value: "about", label: "About" },
    { value: "posts", label: "Posts" },
    { value: "activity", label: "Activity" },
    { value: "communities", label: "Communities" },

  ];

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-muted-foreground">
                Joined ReadMindMe in May 2023
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge variant="secondary">Christian</Badge>
                <Badge variant="secondary">Bible Study</Badge>
                <Badge variant="secondary">Prayer Warrior</Badge>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center space-x-4 sm:justify-start">
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button variant="outline">
              <User className="mr-2 h-4 w-4" />
              Follow
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="space-y-4">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.label} value={tab.value}>{tab.label}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="posts">
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>
                See what John has been sharing recently
              </CardDescription>
            </CardHeader>
            <CardContent>
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="mb-4 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <p>{post.content}</p>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{post.likes} Likes</span>
                    <span>{post.comments} Comments</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                John's latest interactions on ReadMindMe
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="mb-4 flex items-center space-x-4 last:mb-0"
                >
                  {activity.type === "joined" && (
                    <User className="h-5 w-5 text-blue-500" />
                  )}
                  {activity.type === "posted" && (
                    <MessageSquare className="h-5 w-5 text-green-500" />
                  )}
                  {activity.type === "commented" && (
                    <MessageSquare className="h-5 w-5 text-yellow-500" />
                  )}
                  <div>
                    <p>{activity.content}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="communities">
          <Card>
            <CardHeader>
              <CardTitle>Communities</CardTitle>
              <CardDescription>Communities John is a part of</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Daily Prayer",
                  "Bible Study Group",
                  "Faith Discussions",
                  "Worship Team",
                ].map((community, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{community}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        View Community
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
