import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Flag, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { EditPost, PostResponse } from "../types/postType";
import { useState } from "react";
import PostEditForm from "./PostEditForm";
import PostDeleteForm from "./PostDeleteForm";
import { useAuth } from "@/features/auth/hooks/use-auth";

type editType = {
  post: PostResponse;
  onPostUpdate: (data: EditPost) => void;
  onPostDelete: (postId: number) => void;
};
function PostActionMenu({ post, onPostUpdate, onPostDelete }: editType) {
  const { auth } = useAuth();
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [reportDialog, setReportDialog] = useState(false);

  const handleEditDialog = (isActive: boolean) => setEditDialog(isActive);
  const handleDeleteDialog = (isActive: boolean) => setDeleteDialog(isActive);

  return (
    <>
      {" "}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {post.author.email === auth.user.email ? (
            <>
              <DropdownMenuItem onClick={() => setEditDialog(true)}>
                <Pencil /> Edit Post
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setDeleteDialog(true)}>
                <Trash2 /> Delete Post
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem onClick={() => setReportDialog(true)}>
              <Flag />
              Report
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <PostEditForm
        post={post}
        onClose={handleEditDialog}
        onEditSubmit={onPostUpdate}
        isEditDialogActive={editDialog}
      />
      <PostDeleteForm
        postId={post.id}
        onDelete={onPostDelete}
        isDeleteDialogActive={deleteDialog}
        onClose={handleDeleteDialog}
      />
      <AlertDialog
        open={reportDialog}
        onOpenChange={(open) =>
          open ? setReportDialog(!open) : setReportDialog(open)
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default PostActionMenu;
