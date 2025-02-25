import { PostResponse } from "../types/postType";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import {
  BookOpen,
  HandHeart,
  HelpingHand,
  MessageCircleMore,
  MessageCircleQuestion,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type PostBadgeProp = {
  post: PostResponse;
};
export interface BibleRespose {
  reference: string
  verses: Verse[]
  text: string
  translation_id: string
  translation_name: string
  translation_note: string
}

export interface Verse {
  book_id: string
  book_name: string
  chapter: number
  verse: number
  text: string
}

function PostBadge({ post }: PostBadgeProp) {
  const [verse, setVerse] = useState<string>("");
  useEffect(() => {
    if (post.postType === "book") {
      axios.get<BibleRespose>("https://bible-api.com/" + post.verse?.text).then((res) => {
        setVerse(res.data.text!);
      });
    }
  }, []);


  switch (post.postType) {
    case "book":
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                variant="secondary"
                className="flex bg-[#E5E1DA]  items-center w-fit space-x-1"
              >
                <BookOpen className="h-3 w-3" />
                <span>{post.verse?.text}</span>
                <span className="text-xs">({post.verse?.book})</span>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{verse}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
