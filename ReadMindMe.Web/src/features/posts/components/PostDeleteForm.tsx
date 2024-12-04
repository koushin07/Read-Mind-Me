import {
  AlertDialogHeader,
    AlertDialogFooter,
    AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";


type PostDeleteFormProps = {
    postId: number,
    onDelete: (postId: number) => void;
    isDeleteDialogActive: boolean;
    onClose: (isActive: boolean) => void;
};
function PostDeleteForm({
    postId,
    onDelete,
    isDeleteDialogActive,
    onClose,

}: PostDeleteFormProps) {
  return (
    <AlertDialog
      open={isDeleteDialogActive}
      onOpenChange={(open) =>
        open ? onClose(!open) : onClose(open)
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
           post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>onDelete(postId)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PostDeleteForm;
