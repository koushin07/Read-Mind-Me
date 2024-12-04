import { PostResponse } from "../types/postType";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  HandHeart,
  HelpingHand,
  MessageCircleMore,
  MessageCircleQuestion,
} from "lucide-react";

type PostBadgeProp = {
  post: PostResponse;
};
function PostBadge({ post }: PostBadgeProp) {
  switch (post.postType) {
    case "book":
      return (
        <Badge
          variant="secondary"
          className="flex bg-[#E5E1DA]  items-center w-fit space-x-1"
        >
          <BookOpen className="h-3 w-3" />
          <span>{post.verse?.text}</span>
          <span className="text-xs">({post.verse?.book})</span>
        </Badge>
      );
    case "guide":
      return (
        <Badge
          variant="secondary"
          className="flex bg-[#E5E1DA]  items-center w-fit space-x-1"
        >
          <HelpingHand className="h-3 w-3" />
          <span>Guide</span>
        </Badge>
      );
    case "prayer":
      return (
        <Badge
          variant="secondary"
          className="flex bg-[#B3C8CF]  items-center w-fit space-x-1"
        >
          <HandHeart className="h-3 w-3" />
          <span>Prayer</span>
        </Badge>
      );
    case "question":
      return (
        <Badge
          variant="secondary"
          className="flex bg-[#89A8B2]  items-center w-fit space-x-1"
        >
          <MessageCircleQuestion className="h-3 w-3" />
          <span>Question</span>
        </Badge>
      );
    case "thoughts":
      return (
        <Badge
          variant="secondary"
          className="flex bg-[#89A8B2]  items-center w-fit space-x-1"
        >
          <MessageCircleMore className="h-3 w-3" />
          <span>Thoughts</span>
        </Badge>
      );
    default:
      return <Badge color="gray">Unknown</Badge>;
  }
}

export default PostBadge;
