import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Users, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import CommunityCard from "@/features/communities/components/CommunityCard";
import CommunityForm from "@/features/communities/components/CommunityForm";
import { useCommunity } from "@/features/communities/hooks/use-community";
import CommunitySkeleton from "@/features/communities/components/CommunityDetailSkeleton";
import { Community } from "@/features/communities/types/community";

export default function CommunityPage() {
  const {
    filteredCommunity,
    communities,
    searchCommunity,
    submitCommunity,
    isLoading,
    fetchAllCommunities,
  } = useCommunity();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchCommunity(searchTerm);
    setSearchTerm("");
  };

  const [openForm, setOpenForm] = useState(false);
  const handleToggleForm = (state: boolean) => setOpenForm(state);
  const [myCommunity, setMyCommunity] = useState<Community[]>([]);

  useEffect(() => {
    fetchAllCommunities();
    setMyCommunity(communities.filter((community) => community.isJoin));
  }, []);

  if (isLoading) {
    return <CommunitySkeleton />;
  } else {
    return (
      <div className="min-h-screen  dark:bg-gray-900">
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Discover Communities</CardTitle>
                  <CardDescription>
                    Find and join communities that align with your faith and
                    interests.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSearch} className="flex space-x-2">
                    <Input
                      placeholder="Search communities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-grow"
                    />
                    <Button type="submit">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </form>
                </CardContent>
              </Card>
              {filteredCommunity.map((community) => (
                <CommunityCard key={community.id} community={community} />
              ))}
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Communities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {myCommunity.map((community) => (
                      <li>
                        <Link
                          to={community.slug}
                          className="flex items-center space-x-2 hover:underline"
                        >
                          <Users className="h-4 w-4" />
                          <span>{community.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => setOpenForm(true)}
                    variant="outline"
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Community
                  </Button>
                  <CommunityForm
                    onSubmit={submitCommunity}
                    isOpen={openForm}
                    onClose={handleToggleForm}
                  />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Community Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Be respectful of all faiths and beliefs</li>
                    <li>No hate speech or discrimination</li>
                    <li>Keep discussions constructive and positive</li>
                    <li>Report any inappropriate content</li>
                  </ul>
                </CardContent>
              </Card>
              {/* <Card>
                <CardHeader>
                  <CardTitle>Trending Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="#"
                        className="text-sm hover:underline flex items-center space-x-2"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span>#InterfaithDialogue</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="text-sm hover:underline flex items-center space-x-2"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span>#SpiritualGrowth</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="text-sm hover:underline flex items-center space-x-2"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span>#PeaceAndUnity</span>
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </main>
      </div>
    );
  }
}
