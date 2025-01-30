import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import PostForm from "@/features/posts/components/PostForm";
import {
  CreateCommunityPost,
  postFormSchema,
  Verse,
} from "@/features/posts/types/postType";
import { z } from "zod";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePost } from "@/features/posts/hooks/use-post";
import PostCard from "@/features/posts/components/PostCard";
import { useComment } from "@/features/comments/hooks/use-comment";
import { useCommunity } from "../hooks/use-community";

type postTabProp = {
  value: string;
  isJoined: boolean;
};

function CommunityPostTab({ value, isJoined }: postTabProp) {
  const auth = useSelector((state: RootState) => state.auth);
  const { currentCommunity } = useSelector(
    (state: RootState) => state.communities
  );

  const {
    handleLikePostCommunity,

    handlePostDelete,
    handleUpdatePost,
    setPosts,
  } = usePost(auth.user);
  const { handleCommentSubmit, handleCommentDelete } = useComment(setPosts);
  const { submitCommunityPost } = useCommunity();

  const handlePostSubmit = (data: z.infer<typeof postFormSchema>) => {
    submitCommunityPost({
      content: data.post,
      verse: { book: data.verse.source, text: data.verse.text } as Verse,
      isPublic: false,
      postType: data.postType,
      communityId: currentCommunity?.id,
    } as CreateCommunityPost);
  };
  const liked = (postId: number) => {
     handleLikePostCommunity(postId, currentCommunity!)
  }

  return (
    <TabsContent value={value} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Create a Post</CardTitle>
        </CardHeader>
        <PostForm isJoined={isJoined} onSubmit={handlePostSubmit} />
      </Card>
      {currentCommunity?.posts.map((post) => (
        <section key={post.id} id={post.slug}>
          <PostCard
            post={post}
            onPostUpdate={handleUpdatePost}
            onPostDelete={handlePostDelete}
            onLike={liked}
            onCommentSubmit={handleCommentSubmit}
            onCommentDelete={handleCommentDelete}
          />
        </section>
      ))}
    </TabsContent>
  );
}

export default CommunityPostTab;
