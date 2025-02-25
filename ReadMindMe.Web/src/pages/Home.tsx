import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import PostCard from "@/features/posts/components/PostCard";
import PostForm from "@/features/posts/components/PostForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SkeletonCard from "@/components/skeletonCard";
import { usePost } from "@/features/posts/hooks/use-post";
import { useComment } from "@/features/comments/hooks/use-comment";
import { z } from "zod";
import {
  CreatePost,
  postFormSchema,
  Verse,
} from "@/features/posts/types/postType";
import { useEffect } from "react";

function HomePage() {
  const auth = useSelector((state: RootState) => state.auth);
  const {
    handleLike,
    fetchPosts,
    handlePostDelete,
    SubmitPost,
    handleUpdatePost,
    posts,
    setPosts,
    isLoading,
  } = usePost(auth.user);
  const { handleCommentSubmit, handleCommentDelete } = useComment(

    setPosts
  );

  const handleFormSubmit = (data: z.infer<typeof postFormSchema>) => {
    SubmitPost({
      content: data.post,
      verse: { book: data.verse.source, text: data.verse.text } as Verse,
      isPublic: true,
      postType: data.postType,
    } as CreatePost);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      <div className="flex-1 space-y-6 my-4">
        <Card>
          <CardHeader>
            <CardTitle>Create a Post </CardTitle>
            <CardDescription>
              Share your thoughts or ask a question
            </CardDescription>
          </CardHeader>
          <PostForm onSubmit={handleFormSubmit} />
        </Card>

        {isLoading ? (
          <SkeletonCard />
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <section key={post.id} id={post.slug}>

                <PostCard
                  post={post}
                  onPostUpdate={handleUpdatePost}
                  onPostDelete={handlePostDelete}
                  onLike={handleLike}
                  onCommentSubmit={handleCommentSubmit}
                  onCommentDelete={handleCommentDelete}
                />
              </section>
            ))}
          </div>
        )}
      </div>

    </>
  );
}

export default HomePage;
