import { Community } from "@/features/communities/types/community";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PersonStanding, Users } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
type communityProp = {
  community: Community;
};

function CommunityCard({ community }: communityProp) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {community.name}
          <Badge variant="secondary">
            {community.userCommunities?.length} members
          </Badge>
        </CardTitle>
        <CardDescription>{community.description}</CardDescription>
      </CardHeader>
      {community.activities?.length > 0 && (
        <CardContent>
          <h3 className="font-semibold mb-2">Recent Activity</h3>
          <ul className="space-y-2">
            {community.activities.map((activity) => (
              <li key={activity.id} className="flex items-center space-x-2">
                <Avatar  className="h-6 w-6">
                  <AvatarFallback > {activity.user[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm capitalize">
                  <strong>{activity.user}</strong> {activity.action}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      )}

      <CardFooter>
        {community.isJoin ? (
          <Link
          to={community.slug}
          className={`w-full ${buttonVariants({ variant: "default" })}`}
        >
          <PersonStanding className="h-4 w-4 mr-2" />
          View Community
        </Link>
        ): (
            <Link
            to={community.slug}
            className={`w-full ${buttonVariants({ variant: "default" })}`}
          >
            <Users className="h-4 w-4 mr-2" />
            Join Community
          </Link>
        )}

      </CardFooter>
    </Card>
  );
}

export default CommunityCard;
