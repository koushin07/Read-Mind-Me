import { User } from "@/features/user/types/user";

import { likePost, unlikePost } from "@/features/posts/services/like-service";
import {
  createPost,
  deletePost,
  getAllPublicPost,
  getTrendingPosts,
  updatePost,
} from "@/features/posts/services/post-service";
import {
  CreatePost,
  EditPost,
  PostResponse,
} from "@/features/posts/types/postType";
import { useState } from "react";
import { toast } from "sonner";
import { Community } from "@/features/communities/types/community";
import { useDispatch } from "react-redux";
import { setCurrentCommunity } from "@/features/communities/communitySlice";

export function usePost(user: User) {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<PostResponse[]>([]);


  const dispatch = useDispatch();

  const fetchPosts = () => {
    getAllPublicPost().then((res) => {
      setPosts(res);
      console.log(posts);
      setIsLoading(false);
    });
  };

  const handlePostDelete = async (postId: number) => {
    // Find the post and its index before removing it
    const postIndex = posts.findIndex((p) => p.id === postId);
    const deletedPost = posts[postIndex];

    // Optimistically update UI by removing the post
    setPosts((prev) => prev.filter((p) => p.id !== postId));

    deletePost(postId).catch((err: unknown) => {
      console.error("Failed to delete post:", err);

      // Reinsert the deleted post back to its original index
      setPosts((prev) => {
        const updatedPosts = [...prev];
        updatedPosts.splice(postIndex, 0, deletedPost);
        return updatedPosts;
      });
    });
  };

  const handleUpdatePost = async (data: EditPost) => {
    const post = posts.find((p) => p.id === data.id);
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === data.id) {
          return {
            ...p,
            verse: data.verse,
            content: data.content,
          };
        }
        return p;
      })
    );
    await updatePost(data).catch((err: unknown) => {
      console.log(err);
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id === data.id) {
            return {
              ...p,
              verse: post!.verse,
              content: post!.content,
            };
          }
          return p;
        })
      );
    });
  };

  const handleLike = async (postId: number) => {
    const post = posts.find((p) => p.id === postId);
    console.log(posts);
    if (!post) return;

    const isCurrentlyLiked = post.isLike;

    // Optimistically update the state
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === postId
          ? {
              ...p,
              likes: p.likes + (isCurrentlyLiked ? -1 : 1),
              isLike: !isCurrentlyLiked,
            }
          : p
      )
    );

    try {
      if (isCurrentlyLiked) {
        // Unlike request
        await unlikePost(postId);
      } else {
        // Like request
        await likePost(postId);
      }
    } catch (err: unknown) {
      console.log(err);
      // Revert state if request fails
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === postId
            ? {
                ...p,
                likes: p.likes + (isCurrentlyLiked ? 1 : -1),
                isLike: isCurrentlyLiked,
              }
            : p
        )
      );
    }
  };

  // const handleShare = (postId: number) => {
  //   setPosts(posts.map(post =>
  //     post.id === postId ? { ...post, shares: post.shares + 1 } : post
  //   ))
  // }
  const handleLikePostCommunity = async (
    postId: number,
    community: Community
  ) => {


    const postIndex = community.posts.findIndex((post) => post.id === postId);

    if (postIndex === -1) return;

    const post = community.posts[postIndex];
    console.log(post);
    const isCurrentlyLiked = post.isLike;

    // Create a new post object with updated properties
    const updatedPost = {
      ...post,
      likes: post.likes + (isCurrentlyLiked ?  -1 : 1),
      isLike: !isCurrentlyLiked,
    };

    // Create a new array of posts with the updated post
    const updatedPosts = [
      ...community.posts.slice(0, postIndex),
      updatedPost,
      ...community.posts.slice(postIndex + 1),
    ];

    // Dispatch the action to update the state with the new array of posts
    dispatch(setCurrentCommunity({...community, posts: updatedPosts}));
    try {
      if (isCurrentlyLiked) {
        // Unlike request
        await unlikePost(postId);
      } else {
        // Like request
        await likePost(postId);
      }
    } catch (err: unknown) {
      console.log(err);
      // Revert state if request fails
      dispatch(setCurrentCommunity({
        ...community,
        posts: community.posts.map((p) =>
          p.id === postId
            ? { ...p, likes: p.likes + (isCurrentlyLiked ? 1 : -1), isLike: isCurrentlyLiked }
            : p
        ),
      }));
    }
  };
  const SubmitPost = async (postData: CreatePost) => {
    if (!postData.content.trim()) {
      toast.error("Error creating post", {
        description: "Post content cannot be empty.",
      });
      return;
    }

    // Generate a temporary post ID (e.g., timestamp-based) for optimistic updates
    const tempId = Date.now();

    const tempPost: PostResponse = {
      id: tempId, // Temporary ID
      author: user,
      isPublic: postData.isPublic,
      community: null,
      content: postData.content,
      likes: 0,
      comments: [],
      isLike: false,
      postType: postData.postType,
      createdAt: new Date().toISOString(),
      verse: {
        book: postData.verse!.book,
        text: postData.verse!.text,
      },
    };

    // Optimistically update the UI
    setPosts((prevPosts) => [tempPost, ...prevPosts]);

    try {
      // Send the request to create a new post
      const newPost = await createPost(postData);

      // Replace the temporary post with the actual post returned from the server
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === tempId
            ? {
                ...post,
                id: newPost.id, // Update the ID with the real one
                createAt: newPost.createdAt,
              }
            : post
        )
      );
      toast.success("Post created successfully!");
    } catch (error: unknown) {
      console.error("Failed to create post:", error);

      // Revert the optimistic update if the API call fails
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== tempId));

      toast.error("Error creating post", {
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const fetchTrendingPosts = async () => {
    return await getTrendingPosts();
  };

  return {
    handlePostDelete,
    handleUpdatePost,
    isLoading,
    posts,
    setPosts,
    handleLike,
    SubmitPost,
    fetchPosts,
    fetchTrendingPosts,
    // handleShare,
    handleLikePostCommunity,
  };
}
