
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";
import CommentForm from "../../comments/components/CommentForm";
import CommentCard from "../../comments/components/CommentCard";
import { EditPost, PostResponse } from "../types/postType";
import { TimeAgo } from "@/utils/timeAgo";

import PostActionMenu from "./PostActionMenu";
import { useState } from "react";
import PostBadge from "./PostBadge";
import UserAvatar from "@/components/userAvatar";

type postProp = {
  post: PostResponse;
  onLike: (id: number) => void;
  onPostUpdate: (data: EditPost) => void;
  onPostDelete: (id: number) => void;
  onCommentSubmit: (post: PostResponse, content: string) => void;
  onCommentDelete: (postId: number, commentId: number) => void;
};

function PostCard({
  onLike,
  onPostUpdate,
  onPostDelete,
  onCommentSubmit,
  onCommentDelete,
  post,
}: postProp) {
  const [showMoreComments, setShowMoreComments] = useState(false);
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <UserAvatar user={post.author}/>
            <div>
              <CardTitle className="text-lg">{post.author.name}</CardTitle>
              <CardDescription className="">
                {" "}
                <TimeAgo timeStamp={post.createdAt} />{" "}
              </CardDescription>
            </div>
          </div>

          <PostActionMenu
            post={post}
            onPostUpdate={onPostUpdate}
            onPostDelete={onPostDelete}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>{post.content}</p>
        <PostBadge post={post} />
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex space-x-12  w-full">
          <Button variant="ghost" size="sm" onClick={() => onLike(post.id)}>
            <Heart
              fill={post.isLike ? "red" : "none"}
              color="red"
              className="mr-2 h-4 w-4"
            />
            {post.likes}
          </Button>
          <Button
            onClick={() => setShowMoreComments((prev) => !prev)}
            variant="ghost"
            size="sm"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            {post.comments.length}
          </Button>
          {/* <Button variant="ghost" size="sm" onClick={() => onShare(post.id)}>
            <Share2 className="mr-2 h-4 w-4" />
            {post.shares}
          </Button> */}
        </div>
        <div className="w-full space-y-2">
          {post.comments
            .slice(0, showMoreComments ? post.comments.length : 2)
            .map((comment) => (
              <CommentCard
                postId={post.id}
                key={comment.id}
                comment={comment}
                onDelete={onCommentDelete}
              />
            ))}

          <CommentForm post={post} onCommentSubmit={onCommentSubmit} />
        </div>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
