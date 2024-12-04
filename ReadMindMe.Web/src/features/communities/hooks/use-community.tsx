import { Community, CreateCommunity } from "../types/community";
import {
  createCommunityPost,
  getAllCommunity,
  getCommunityBySlug,
  PostCommunity,
  updateJoinCommunity,
} from "../services/community-service";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  addTemporaryCommunity,
  removeTemporaryCommunity,
  setCommunities,
  setCurrentCommunity,
  setFilteredCommunity,
  setIsloading,
  updateCommunity,
} from "../communitySlice";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import {
  CreateCommunityPost,
  PostResponse,
} from "@/features/posts/types/postType";
import { useAuth } from "@/features/auth/hooks/use-auth";

export function useCommunity() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { communities, isLoading, filteredCommunity, currentCommunity } =
    useSelector((state: RootState) => state.communities);

  const dispatch = useDispatch();

  const fetchAllCommunities = () => {
    dispatch(setIsloading(true));
    getAllCommunity()
      .then((res) => {
        console.log(res);

        dispatch(setCommunities(res));
        console.log(filteredCommunity);
      })
      .finally(() => dispatch(setIsloading(false)));
  };

  const searchCommunity = (query: string) => {
    dispatch(setFilteredCommunity(query));
  };

  const fetchCommunityDetails = async (slug: string) => {
    const community = await getCommunityBySlug(slug);
    dispatch(setCurrentCommunity(community));
    return community;
  };

  const submitCommunity = async (data: CreateCommunity) => {
    console.log("first");
    // Generate a temporary ID for the new community
    const tempId = Date.now();

    const tempCommunity: Community = {
      id: tempId, // Temporary ID
      name: data.name,
      slug: data.name.toLowerCase().replace(/\s+/g, "-"), // Generate slug from the name
      description: data.description,
      userCommunities: [], // Assuming the creator is the first member
      activities: [], // No activity initially
      isJoin: false,
      posts: [],
      guidelines: data.guidelines,
      about: data.about,
    };

    // Optimistically add the new community to the UI
    dispatch(addTemporaryCommunity(tempCommunity));

    // Update filtered communities right after adding the temporary community
    dispatch(setFilteredCommunity("")); // Optional, reset filter if needed

    try {
      // Send the community creation request to the backend
      const savedCommunity = await PostCommunity(data);

      // Replace the temporary community with the real one from the backend
      dispatch(updateCommunity({ tempId, savedCommunity }));

      // Update filtered communities after the real community has been added
      dispatch(setFilteredCommunity("")); // Optional, reapply filter if needed

      navigate(`${savedCommunity.slug}`);
    } catch (err: unknown) {
      console.error("Failed to create community:", err);

      // Revert the optimistic update in case of an error
      dispatch(removeTemporaryCommunity(tempId));

      toast.error("Error creating community", {
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const joinCommunity = async (id: number) => {
    try {
      const community = await updateJoinCommunity(id);

      dispatch(
        updateCommunity({ tempId: community.id, savedCommunity: community })
      );
      toast.success("Welcome to the Community", {
        description: "You are now a member of the community",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submitCommunityPost = async (data: CreateCommunityPost) => {
    // Create a temporary community post for optimistic UI
    const tempPost: PostResponse = {
      id: Date.now(), // Temporary unique ID
      content: data.content,
      likes: 0,
      comments: [],
      isLike: false,
      createdAt: new Date().toISOString(),
      author: auth.user,
      verse: data.verse!,
      isPublic: data.isPublic,
      community: [],
      postType: data.postType,
    };

    console.log("Temp Post:", tempPost);

    // Optimistic update: Add the post to the Redux state immediately
    const updatedPosts = [tempPost, ...currentCommunity!.posts];

    dispatch(
      setCurrentCommunity({
        ...currentCommunity,
        posts: updatedPosts,
      })
    );

    console.log("Updated Posts after optimistic update:", updatedPosts);

    try {
      // Send request to the server
      const savedPost = await createCommunityPost(data);

      console.log("Saved Post:", savedPost);

      // Replace the temporary post with the actual post from the server
      const finalPosts = updatedPosts.map((post) =>
        post.id === tempPost.id ? savedPost : post
      );

      dispatch(
        setCurrentCommunity({
          ...currentCommunity,
          posts: finalPosts,
        })
      );
    } catch (error) {
      console.error("Error creating community post:", error);

      // Revert optimistic update on failure
      const revertedPosts = updatedPosts.filter(
        (post) => post.id !== tempPost.id
      );

      dispatch(
        setCurrentCommunity({
          ...currentCommunity,
          posts: revertedPosts,
        })
      );

      console.log("Reverted Posts:", revertedPosts);
    }
  };

  return {
    fetchAllCommunities,
    submitCommunity,
    communities,
    isLoading,
    filteredCommunity,
    searchCommunity,
    fetchCommunityDetails,
    joinCommunity,
    submitCommunityPost,
  };
}
