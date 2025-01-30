/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
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
import { MessageSquare, User, UserCheck, UserX } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "@/features/user/hooks/use-user";
import moment from "moment";



interface Activity {
  id: number;
  type: "joined" | "posted" | "commented";
  content: string;
  date: string;
}

export default function ProfilePage() {
  const { slug } = useParams();
  const { getUserBySlug, userSlug, followUser, unFollowUser } = useUser();
  useEffect(() => {
    if (slug) {
      getUserBySlug(slug);
    }
  }, []);

  const [activities] = useState<Activity[]>([
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
    { value: "posts", label: "Posts" },
    { value: "activity", label: "Activity" },
    { value: "communities", label: "Communities" },
  ];

  // const handleCreateMessage = async () => {
  //   try {
  //     const newConvo = {
  //       creatorId: auth.user.id,
  //       participantsId: [userSlug!.id],
  //     } as createConversation;
  //     console.log(newConvo)
  //     const convoId = await postConversation(newConvo);
  //     if (convoId) navigate(convoId);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userSlug?.avatar} alt="User" />
              <AvatarFallback>{userSlug?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold">{userSlug?.name} </h1>
              <p className="text-muted-foreground">
                Joined ReadMindMe in{" "}
                {moment(userSlug?.createdAt).format("MMMM D YYYY")}
              </p>
              <p className="text-muted-foreground pl-4 pt-2 ">
                {userSlug?.bio ? userSlug?.bio : "No bio yet"}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                {/* <Badge variant="secondary">Christian</Badge>
                <Badge variant="secondary">Bible Study</Badge>
                <Badge variant="secondary">Prayer Warrior</Badge> */}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center space-x-4 sm:justify-start">
            {/* <Button onClick={handleCreateMessage}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button> */}
            {userSlug?.isFollowed ? (
              <Button onClick={unFollowUser} variant="destructive">
                <UserX className="mr-2 h-4 w-4" />
                Unfollow
              </Button>
            ) : (
              <Button onClick={followUser} >
                <UserCheck className="mr-2 h-4 w-4" />
                Follow
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="space-y-4">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.label} value={tab.value}>
              {tab.label}
            </TabsTrigger>
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
              {userSlug?.postActivities.map((post) => (
                <div
                  key={post.id}
                  className="mb-4 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <p>{post.content}</p>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{post.likeCount} Likes</span>
                    <span>{post.commentCount} Comments</span>
                    <span>{moment(post.createdAt).format("YYYY-DD-MM")}</span>
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
                {userSlug?.communities.map((community, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {community.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" className="w-full">
                        <Link to={`/community/${community.slug}`}>
                          View Community
                        </Link>
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
