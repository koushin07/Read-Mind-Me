import { PostResponse } from "@/features/posts/types/postType";
import { Comment, CommentRequest } from "../types/commentType";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { deleteComment, PostComment } from "../services/commentService";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setCurrentCommunity } from "@/features/communities/communitySlice";

export const useComment = (
  setPosts: React.Dispatch<React.SetStateAction<PostResponse[]>>
) => {
  const { auth } = useAuth();
  const { currentCommunity } = useSelector(
    (state: RootState) => state.communities
  );
  const dispatch = useDispatch();

  const handleCommentSubmit = async (post: PostResponse, content: string) => {
    console.log(content);
    if (content.length <= 0) {
      toast.error("Error Adding comment", {
        description: "comment content too short",
      });
      return;
    }
    const request: CommentRequest = {
      postId: post.id,
      content,
    };

    // Generate a temporary ID for the comment (e.g., timestamp-based)
    const tempId = Math.random();

    const tempComment: Comment = {
      id: tempId, // Temporary ID
      user: auth.user, // Replace with actual user data if available
      content: content,
      avatar: "/placeholder.svg?height=32&width=32",
    };

    if (currentCommunity) {
      dispatch(
        setCurrentCommunity({
          ...currentCommunity, // Spread the existing community properties
          posts: currentCommunity!.posts.map((p) =>
            p.id === post.id
              ? { ...p, comments: [...p.comments, tempComment] } // Update the specific post
              : p
          ),
        })
      );
    }


    // Optimistically update state
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === post.id ? { ...p, comments: [...p.comments, tempComment] } : p
      )
    );

    try {
      // Send the comment to the server
      const savedComment: Comment = await PostComment(request);
      dispatch(
        setCurrentCommunity({
          ...currentCommunity, // Spread the existing community properties
          posts: currentCommunity?.posts.map((p) =>
            p.id === post.id
              ? { ...p, comments: [...p.comments, tempComment] } // Update the specific post
              : p
          ),
        })
      );

      // Replace the temporary comment with the server response
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id
            ? {
                ...p,
                comments: p.comments.map((comment) =>
                  comment.id === tempId ? savedComment : comment
                ),
              }
            : p
        )
      );
    } catch (error: unknown) {
      console.error("Failed to post comment:", error);

      // Revert optimistic update on failure
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === post.id
            ? {
                ...p,
                comments: p.comments.filter((comment) => comment.id !== tempId),
              }
            : p
        )
      );
    }
  };

  const handleCommentDelete = async (postId: number, commentId: number) => {
    let deletedComment: Comment | null = null;
    let deletedIndex: number | null = null;

    // Optimistically update the UI by omitting the comment
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          deletedIndex = post.comments.findIndex(
            (comment) => comment.id === commentId
          );
          if (deletedIndex !== -1) {
            deletedComment = post.comments[deletedIndex];
            return {
              ...post,
              comments: post.comments.filter(
                (comment) => comment.id !== commentId
              ),
            };
          }
        }
        return post;
      })
    );

    deleteComment(commentId).catch((error) => {
      console.error("Failed to delete comment:", error);

      // Revert the UI update by reinserting the deleted comment at its original index
      if (deletedComment !== null && deletedIndex !== null) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.id === postId) {
              const updatedComments = [...post.comments];
              updatedComments.splice(deletedIndex!, 0, deletedComment!); // Reinsert at the original index
              return {
                ...post,
                comments: updatedComments,
              };
            }
            return post;
          })
        );
      }
    });
  };

  return {
    handleCommentSubmit,
    handleCommentDelete,
  };
};
