
import { Trash2 } from "lucide-react";
import { buttonVariants } from "../../../components/ui/button";
import { Comment } from "../types/commentType";
import { useAuth } from "@/features/auth/hooks/use-auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import UserAvatar from "@/components/userAvatar";

type commentProp = {
  comment: Comment;
  postId: number;
  onDelete: (postId:number, commentId: number) => void;
};
function CommentCard({ comment, postId, onDelete }: commentProp) {
  const { auth } = useAuth();
  const canDelete = (): boolean => {
    return comment.user.id === auth.user.id;
  };
  return (
    <div key={comment.id} className="flex items-start space-x-2">
       <UserAvatar user={comment.user}/>
      <div className="flex-1 bg-muted p-2 rounded-md">
        <p className="font-semibold">{comment.user.name}</p>
        <p>{comment.content}</p>
      </div>
      {canDelete() && (
        // <Button size="sm" variant="ghost" onClick={() => onDelete(comment.id)}>
        //   <Trash2 className="h-4 w-4" color="red" />
        // </Button>
        <AlertDialog>
          <AlertDialogTrigger
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <Trash2 className="h-4 w-4" color="red" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your comment.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=> onDelete(postId, comment.id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

export default CommentCard;
