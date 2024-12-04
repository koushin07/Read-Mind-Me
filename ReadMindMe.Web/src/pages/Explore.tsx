import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import TrendingTab from "@/features/explores/components/TrendingTab";
import { Comment } from "@/features/comments/types/commentType";
import TopicCard from "@/features/explores/components/TopicCard";
import PeopleCard from "@/features/explores/components/PeopleCard";
import { PostResponse, trending } from "@/features/posts/types/postType";
import { People } from "@/features/user/types/user";
import { usePost } from "@/features/posts/hooks/use-post";
import { useAuth } from "@/features/auth/hooks/use-auth";

export default function ExplorePage() {
  const {auth} =useAuth()
  const {fetchTrendingPosts} =usePost(auth.user)
  const [trendingPosts, setTrendingPosts] = useState(fetchTrendingPosts())
  const [trendingTopics, setTrendingTopics] = useState<trending[]>([
    { id: 1, name: "Interfaith Dialogue", posts: 1250 },
    { id: 2, name: "Meditation Practices", posts: 980 },
    { id: 3, name: "Spiritual Growth", posts: 875 },
    { id: 4, name: "Religious Festivals", posts: 750 },
    { id: 5, name: "Faith and Science", posts: 620 },
  ]);

  const [suggestedUsers, setSuggestedUsers] = useState<People[]>([
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Interfaith Leader",
      following: false,
    },
    {
      id: 2,
      name: "Muhammad Ali",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Islamic Scholar",
      following: false,
    },
    {
      id: 3,
      name: "Rabbi David",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Jewish Educator",
      following: false,
    },
    {
      id: 4,
      name: "Sister Mary",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Catholic Nun",
      following: false,
    },
    {
      id: 5,
      name: "Guru Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Hindu Spiritual Guide",
      following: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality here
  };

  const handleLike = (postId: number) => {
    setTrendingPosts((posts) =>
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleFollow = (userId: number) => {
    setSuggestedUsers((users) =>
      users.map((user) =>
        user.id === userId ? { ...user, following: !user.following } : user
      )
    );
  };

  return (
    <div className="min-h-screen  dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore</h1>
        <div  className="mb-6">
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              placeholder="Search for topics, users, or content..."
              className="flex-grow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
        </div>
        <Tabs defaultValue="trending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
          </TabsList>
          <TabsContent value="trending">
            <TrendingTab onLike={handleLike} trendings={trendingPosts} />
          </TabsContent>
          <TabsContent value="topics">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {trendingTopics.map((topic) => (
                <TopicCard topic={topic} key={topic.id} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="people">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {suggestedUsers.map((user) => (
                <PeopleCard key={user.id} onFollow={handleFollow} user={user} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
