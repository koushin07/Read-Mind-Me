import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {  Info } from "lucide-react";
import CommunityPostTab from "./CommunityPostTab";
import CommunityEventTab from "./CommunityEventTab";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type TabProps = {
  isJoined: boolean;
};
function CommunityTabList({ isJoined }: TabProps) {
  const { currentCommunity } = useSelector(
    (state: RootState) => state.communities
  );
  const tabs = [
    { name: "Posts", value: "posts" },
    { name: "Events", value: "events" },
    { name: "About", value: "about" },
    { name: "Members", value: "members" },
    { name: "Guidelines", value: "guidelines" },
  ];

  return (
    <Tabs defaultValue={tabs[0].value}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <CommunityPostTab isJoined={isJoined} value={tabs[0].value} />
      <CommunityEventTab value={tabs[1].value} />
      <TabsContent value="about">
        <Card>
          <CardHeader>
            <CardTitle>About Our Community</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-7">{currentCommunity?.about}</p>
          </CardContent>
        </Card>
      </TabsContent>{" "}
      <TabsContent value="members">
        <Card>
          <CardHeader>
            <CardTitle>Community Members</CardTitle>
            <CardDescription>
              {currentCommunity!.userCommunities.length} members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentCommunity!.userCommunities.map((member) => (
                <div key={member.user.id} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{member?.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{member.user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {member.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="guidelines">
        <Card>
          <CardHeader>
            <CardTitle>Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {currentCommunity?.guidelines.map((guideline, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Info className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <span>{guideline.value}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default CommunityTabList;
