"use client";

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  MessageSquare,
  Users,
  Store,

  Grid,
  ChevronRight,
} from "lucide-react";

import { Link, useSearchParams } from "react-router-dom";
import { GetSearch } from "@/features/user/services/user-service";
import { SearchResult } from "@/features/user/types/user";
import { Separator } from "@/components/ui/separator";
import moment from "moment";
import { CommunityActivity } from "@/features/communities/types/community";
import UserAvatar from "@/components/userAvatar";
import { TimeAgo } from "@/utils/timeAgo";
import PostBadge from "@/features/posts/components/PostBadge";

export default function SearchPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchParams] = useSearchParams();
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const searchValue = searchParams.get("value"); // Get the "value" param
  useEffect(() => {
    if (searchValue) {
      GetSearch(searchValue).then((res) => {
        setSearchResult(res);
      });
    }
  }, [searchValue]);
  const filters = [
    { id: "all", label: "All", icon: Grid },
    { id: "people", label: "People", icon: Users },
    { id: "posts", label: "Posts", icon: MessageSquare },
    { id: "communities", label: "Communities", icon: Store },
  ];

  const activityPerDate = (activities: CommunityActivity[]) => {
    const filteredActivities = activities.filter((a) =>
      moment(a.createdAt).isSame(moment(), "day")
    );
    return filteredActivities.length;
  };
  return (
    <div className="container mx-auto py-6">
      <div className="flex gap-6">
        {/* Filters Sidebar - Fixed */}
        <div className="w-64 flex-shrink-0 sticky top-6 self-start max-h-[calc(100vh-3rem)]">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <div className="space-y-4 ">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeFilter === filter.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <filter.icon className="h-4 w-4" />
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* {activeFilter === "people" && (
            <div className="mt-6 space-y-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="location">
                  <AccordionTrigger>Location</AccordionTrigger>
                  <AccordionContent>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="la">Los Angeles</SelectItem>
                        <SelectItem value="ch">Chicago</SelectItem>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="education">
                  <AccordionTrigger>Education</AccordionTrigger>
                  <AccordionContent>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seminary">Seminary</SelectItem>
                        <SelectItem value="bible-college">
                          Bible College
                        </SelectItem>
                        <SelectItem value="university">University</SelectItem>
                      </SelectContent>
                    </Select>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )} */}
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 space-y-6 overflow-y-auto max-h-[calc(100vh-3rem)]">
          {/* ALL TAB */}
          {activeFilter === "all" && (
            <div className="flex-1 space-y-6 ">
              {/* Groups Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Communities</h2>
                  <Button
                    variant="ghost"
                    className="text-sm"
                    onClick={() => setActiveFilter("communities")}
                  >
                    See all
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {searchResult?.communities.map((community) => (
                    <Card
                      key={community.id}
                      className="flex items-start space-x-4 p-4 rounded-lg border"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{community.name}</h3>
                          {/* {group.privacy === "public" ? (
                          <Globe className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )} */}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {/* {group.privacy === "public" ? "Public" : "Private"} ·{" "} */}
                          {community.userCommunities.length} members ·{" "}
                          {activityPerDate(community.activities)} posts a day
                        </p>
                        <p className="text-sm">{community.about}</p>
                      </div>
                      <Link
                        to={community.slug}
                        className={` ${buttonVariants({
                          variant: "default",
                        })}`}
                      >
                        {community.isJoin ? "Visit" : "Join"}
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              {/* People Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">People</h2>
                  <Button
                    variant="ghost"
                    className="text-sm"
                    onClick={() => setActiveFilter("people")}
                  >
                    See all
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {searchResult?.users.map((person) => (
                    <Card
                      key={person.id}
                      className="flex items-start space-x-4 p-4 rounded-lg border"
                    >
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={person.avatar} />
                        <AvatarFallback>{person.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold">{person.name}</h3>
                        {/* <p className="text-sm text-muted-foreground">
                        {person.role}
                      </p> */}
                        <p className="text-sm text-muted-foreground">
                          {person.email}
                        </p>
                      </div>
                      <Button variant="outline">Add Friend</Button>
                    </Card>
                  ))}
                </div>
              </div>
              <Separator />

              {/* Posts Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Posts</h2>
                  <Button
                    variant="ghost"
                    className="text-sm"
                    onClick={() => setActiveFilter("posts")}
                  >
                    See all
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                {searchResult?.posts.map((post) => (
                  <Card className="">
                    <CardHeader>
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-4">
                          <UserAvatar user={post.author} />
                          <div>
                            <CardTitle className="text-lg">
                              <Link
                                className="hover:underline"
                                to={`/profile/${post.author.slug}`}
                              >
                                {post.author.name}
                              </Link>
                            </CardTitle>
                            <CardDescription className="">
                              {" "}
                              <TimeAgo timeStamp={post.createdAt} />{" "}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                      <PostBadge post={post} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          {activeFilter === "people" && (
            <div className="space-y-4">
              {searchResult?.users.map((person) => (
                <Card
                  key={person.id}
                  className="flex items-start space-x-4 p-4 rounded-lg border"
                >
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={person.avatar} />
                    <AvatarFallback>{person.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold">{person.name}</h3>
                    {/* <p className="text-sm text-muted-foreground">
                        {person.role}
                      </p> */}
                    <p className="text-sm text-muted-foreground">
                      {person.email}
                    </p>
                  </div>
                  <Button variant="outline">Add Friend</Button>
                </Card>
              ))}
            </div>
          )}

          {activeFilter === "communities" && (
            <div className="space-y-4">
              {searchResult?.communities.map((community) => (
                <Card
                  key={community.id}
                  className="flex items-start space-x-4 p-4 rounded-lg border"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{community.name}</h3>
                      {/* {group.privacy === "public" ? (
                          <Globe className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )} */}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {/* {group.privacy === "public" ? "Public" : "Private"} ·{" "} */}
                      {community.userCommunities.length} members ·{" "}
                      {activityPerDate(community.activities)} posts a day
                    </p>
                    <p className="text-sm">{community.about}</p>
                  </div>
                  <Link
                    to={community.slug}
                    className={` ${buttonVariants({
                      variant: "default",
                    })}`}
                  >
                    {community.isJoin ? "Visit" : "Join"}
                  </Link>
                </Card>
              ))}
            </div>
          )}
          {activeFilter === "posts" && (
            <div className="space-y-4">
              {searchResult?.posts.map((post) => (
                <Card className="">
                  <CardHeader>
                    <div className="flex justify-between">
                      <div className="flex items-center space-x-4">
                        <UserAvatar user={post.author} />
                        <div>
                          <CardTitle className="text-lg">
                            <Link
                              className="hover:underline"
                              to={`/profile/${post.author.slug}`}
                            >
                              {post.author.name}
                            </Link>
                          </CardTitle>
                          <CardDescription className="">
                            {" "}
                            <TimeAgo timeStamp={post.createdAt} />{" "}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
                    <PostBadge post={post} />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
