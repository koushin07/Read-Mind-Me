import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
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
    posts,
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
      <div className="flex-1 space-y-6">
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
      <aside className="w-full md:w-64 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Trending Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm hover:underline">
                  #FaithJourney
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:underline">
                  #DailyDevotion
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm hover:underline">
                  #PrayerRequests
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Suggested Users</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Sarah Johnson"
                  />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Faith Blogger</p>
                </div>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </li>
              <li className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="Michael Lee"
                  />
                  <AvatarFallback>ML</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Michael Lee</p>
                  <p className="text-sm text-muted-foreground">Youth Pastor</p>
                </div>
                <Button variant="outline" size="sm">
                  Follow
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </aside>
    </>
  );
}

export default HomePage;
