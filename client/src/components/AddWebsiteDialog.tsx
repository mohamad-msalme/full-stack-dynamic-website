import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
  FormLabel,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TargetAudienceQuery } from "@src/api/services/targetAudience";
import { WebsiteMutation, WebsiteQuery } from "@src/api/services/website";
import { ReloadIcon } from "@radix-ui/react-icons";

const schema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .trim(),
  description: z
    .string()
    .min(1, {
      message: "Description is required",
    })
    .trim(),
  target: z.string().min(1, {
    message: "Target is Required",
  }),
});

export type TWebsiteSchema = z.infer<typeof schema>;

export const AddWebsiteDialog: React.FC = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const { mutateAsync } = useMutation(WebsiteMutation());
  const { data } = useQuery(TargetAudienceQuery());
  const form = useForm<TWebsiteSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      target: "",
    },
  });

  const onSubmit: SubmitHandler<TWebsiteSchema> = async (data) => {
    try {
      const result = await mutateAsync(data);
      await queryClient.invalidateQueries({
        queryKey: WebsiteQuery().queryKey,
      });
      form.reset();
      toast("Success");
      setOpen(false);
      console.log({ result });
    } catch (error) {
      if (isAxiosError(error) && error.status === 401) throw error;
      toast("Error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button className=" flex gap-2 mb-8 ml-auto">
          <PlusIcon /> Add Website
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add website</DialogTitle>
          <DialogDescription>
            Make changes to your website here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Website Name <span className=" text-rose-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Website Name"
                      {...field}
                      className="py-3 px-3"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Website Description{" "}
                    <span className=" text-rose-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Website Description"
                      className="py-3 px-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col space-y-1.5">
              <Controller
                name="target"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Target user <span className=" text-rose-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="bg-transparent">
                          <SelectValue placeholder="Select target user" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectGroup>
                            {(data ?? []).map((item) => (
                              <SelectItem key={item._id} value={item._id}>
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                rules={{ required: true }}
              />
            </div>
            <DialogFooter>
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="p-2 px-3"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                    <span>Please wait</span>
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
