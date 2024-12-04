import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { Community } from "@/features/communities/types/community";
import CommunityTabList from "@/features/communities/components/CommunityTabList";
import CommunitySkeleton from "@/features/communities/components/CommunityDetailSkeleton";
import { Users } from "lucide-react";
import { useCommunity } from "@/features/communities/hooks/use-community";

export default function CommunityDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [community, setCommunity] = useState<Community>({} as Community);
  const { fetchCommunityDetails, joinCommunity } = useCommunity();

  const { slug } = useParams();

  useEffect(() => {
    if (!slug) {
      console.error("Slug is undefined");
      return;
    }

    const fetchCommunity = async () => {
      try {
        const community = await fetchCommunityDetails(slug);
        console.log(community);
        setCommunity(community);
      } catch (error) {
        console.error("Error fetching community:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunity();
  }, []);

  const handleJoinCommunity = async (id: number) => {
    await joinCommunity(id);
    setCommunity({ ...community, isJoin: true });
    // Add join logic here
  };

  if (isLoading) {
    return <CommunitySkeleton />;
  } else {
    return (
      <div className="container mx-auto p-6">
        <div className=" w-full">
          <div className="space-y-6">
            <Card className="border-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold">
                      {community.name}
                    </CardTitle>
                    <CardDescription className="">
                      {community.description}
                    </CardDescription>
                  </div>
                  {!community.isJoin && (
                    <Button
                      size={"lg"}
                      onClick={() => handleJoinCommunity(community.id)}
                    >
                      <Users />
                      Join Community
                    </Button>
                  )}

                  {/* <Badge variant="secondary" className="text-lg">
                    {community.userCommunities?.length} members
                  </Badge> */}
                </div>
              </CardHeader>
              <CardContent>

                <CommunityTabList isJoined={community.isJoin} />
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    );
  }
}
