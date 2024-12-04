import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateCommunity } from "../types/community";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Plus, X } from "lucide-react";

type communityFormProps = {
  isOpen: boolean;
  onClose: (isActive: boolean) => void;
  onSubmit: (data: CreateCommunity) => void;
};
const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(100),
  about: z.string().max(200),
  guidelines: z
    .array(
      z.object({
        value: z.string().min(1, { message: "Guideline cannot be empty." }),
      })
    )
    .min(1, {
      message: "At least one guideline is required.",
    }),
});
function CommunityForm({ isOpen, onClose, onSubmit }: communityFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      about: "",
      guidelines: [{ value: "" }],
    },
  });
  const onSubmitCommunity = (data: z.infer<typeof formSchema>) => {
    onSubmit({
      name: data.name,
      description: data.description,
      about: data.about,
      guidelines: data.guidelines,
    } as CreateCommunity);
    onClose(false);
    form.reset();
  };
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "guidelines",
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? onClose(!open) : onClose(open))}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Community</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitCommunity)}
            className="space-y-4"
          >
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-6">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Community Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Community Name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Short Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Breif description of your community"
                          {...field}
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormDescription>
                        {" "}
                        This will appear in search results and community cards.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  name="about"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>About</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed description of your community"
                          {...field}
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormDescription>
                        Provide more details about your community&apos;s
                        purpose, values, and activities.
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>

            <div>
              <div className="flex items-center justify-between">
                <FormLabel>Community Guidelines</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ value: "" })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Guideline
                </Button>
              </div>
              {fields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`guidelines.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex gap-2 mt-2">
                          <Input
                            placeholder={`Guideline ${index + 1}`}
                            {...field}
                          />
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => remove(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <FormDescription className="mt-2">
                Set clear guidelines to help maintain a positive community
                environment.
              </FormDescription>
            </div>
            {/* <div>
              <FormField\]=[-mmk.lo]
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Community Description"
                        {...field}
                        className="min-h-[100px]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div> */}
            <DialogFooter>
              <Button type="submit">Create Community</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
export default CommunityForm;
