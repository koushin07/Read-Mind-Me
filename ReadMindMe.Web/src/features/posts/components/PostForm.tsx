import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CardContent, CardFooter } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { postFormSchema, SourceList } from "../types/postType";
import { Badge } from "@/components/ui/badge";

type postFormProp = {
  onSubmit: (postData: z.infer<typeof postFormSchema>) => void;
  isJoined?: boolean;
};

function PostForm({ onSubmit, isJoined = true }: postFormProp) {
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      post: "",
      postType: "thoughts",
      verse: { text: "", source: "Bible" },
    },
  });

  const sourceList: SourceList[] = [
    { value: "Bible", label: "Bible" },
    { value: "Torah", label: "Torah" },
    { value: "Bhagavad Gita", label: "Bhagavad Gita" },
    { value: "Other", label: "other" },
    { value: "Quran", label: "Quran" },
  ];

  const postTypes = [
    { value: "thoughts", label: "Thoughts" },
    { value: "question", label: "Question" },
    { value: "book", label: "Book" },
    { value: "prayer", label: "Prayer" },
    { value: "guide", label: "Guide" },
  ];
  const submitForm = (data: z.infer<typeof postFormSchema>) => {
    onSubmit(data);
    form.reset();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="space-y-4">
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="post"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Share your thoughts or ask a question"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postType"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {postTypes.map((type) => (
                      <Badge
                        key={type.label}
                        variant={
                          field.value === type.value ? "default" : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => field.onChange(type.value)}
                      >
                        {type.label}
                      </Badge>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("postType") === "book" && (
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="verse.text"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Add a verse (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="verse.source"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sourceList.map((source) => (
                          <SelectItem key={source.value} value={source.value}>
                            {source.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button disabled={!isJoined} type="submit">
            Post
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}

export default PostForm;
