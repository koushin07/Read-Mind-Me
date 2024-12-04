import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { trending } from "@/types/post";
import { TrendingUp } from "lucide-react";


type TrendingTopicProp = {
    topic: trending
}
function TopicCard({topic}: TrendingTopicProp) {
  return (
    <Card >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {topic.name}
          <Badge variant="secondary">{topic.posts} posts</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Explore discussions on {topic.name}
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <TrendingUp className="h-4 w-4 mr-2" />
          View Topic
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TopicCard;
