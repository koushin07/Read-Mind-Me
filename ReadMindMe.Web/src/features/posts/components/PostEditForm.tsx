import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import {
  EditPost,
  PostResponse,
  SourceList,
  SourceType,
} from "../types/postType";
import { Button } from "@/components/ui/button";

type editProps = {
  post: PostResponse;
  onEditSubmit: (data: EditPost) => void;
  onClose: (isActive: boolean) => void;
  isEditDialogActive: boolean;
};

function PostEditForm({
  post,
  onEditSubmit,
  onClose,
  isEditDialogActive,
}: editProps) {
  const sourceList: SourceList[] = [
    { value: "Bible", label: "Bible" },
    { value: "Torah", label: "Torah" },
    { value: "Bhagavad Gita", label: "Bhagavad Gita" },
    { value: "Other", label: "other" },
    { value: "Quran", label: "Quran" },
  ];
  const [editPost, setEditPost] = useState<EditPost>({
    content: post.content,
    id: post.id,
    verse: post.verse,
    postType: post.postType
  });
  return (
    <Dialog
      open={isEditDialogActive}
      onOpenChange={(open) => (open ? onClose(!open) : onClose(open))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{post.author.name}</DialogTitle>
          <DialogDescription>Edit Post</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            value={editPost.content}
            onChange={(e) =>
              setEditPost({ ...editPost, content: e.target.value })
            }
            placeholder="What's on your mind?"
          />
          <div className="flex justify-between">
            <Input
              value={editPost.verse?.text}
              className="w-[15rem]"
              onChange={(e) =>
                setEditPost({
                  ...editPost,
                  verse: {
                    ...editPost.verse,
                    text: e.target.value,
                  },
                })
              }
              placeholder="Add a verse (optional)"
            />
            <Select
              value={editPost.verse?.book}
              onValueChange={(value) => {
                setEditPost({
                  ...editPost,
                  verse: {
                    ...editPost.verse,
                    book: value as SourceType,
                  },
                });
                console.log(value);
              }}
            >
              <SelectTrigger className="w-2/5">
                <SelectValue placeholder="Select a book" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Book</SelectLabel>
                  {sourceList.map((source) => (
                    <SelectItem key={source.value} value={source.value}>
                      {source.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end">
          <DialogClose asChild>
            <Button onClick={() => onEditSubmit(editPost)}>Save Changes</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PostEditForm;
