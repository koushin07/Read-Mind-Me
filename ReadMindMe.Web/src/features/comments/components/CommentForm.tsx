import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Send } from "lucide-react";
import { PostResponse } from "@/features/posts/types/postType";

type prop = {
  post: PostResponse;
  onCommentSubmit: (post: PostResponse, content: string) => void;
};

function CommentForm({ post, onCommentSubmit }: prop) {
  const [content, setContent] = useState<string>('');

  return (
    <div className="flex items-center space-x-2">
      <Input
        placeholder="Write a comment..."
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
      />
      <Button
        size="icon"
        onClick={() => {
          onCommentSubmit(post, content);
          setContent('');
        }}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default CommentForm;
