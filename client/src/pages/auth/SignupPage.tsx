import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";
import { Button } from "@src/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertDestructive } from "@src/components/AlertDestructive";
import { useMutation } from "@tanstack/react-query";
import { signupMutation } from "@src/api/services/signup";
import { signinMutaion } from "@src/api/services/signin";

const schema = z.object({
  name: z.string().min(1, {
    message: "Name is Required",
  }),
  email: z.string().email().min(1, {
    message: "Email is Required",
  }),
  password: z.string().min(1, {
    message: "Password is Required",
  }),
});

type TSchema = z.infer<typeof schema>;

const SignupPage: React.FC = () => {
  const { mutateAsync } = useMutation(signupMutation());
  const { mutateAsync: sigin } = useMutation(signinMutaion());
  const navigate = useNavigate();
  const [errMsg, setErrorMsg] = React.useState("");
  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit: SubmitHandler<TSchema> = async (data) => {
    try {
      const res = await mutateAsync(data);
      const { name, ...rest } = data;
      const res2 = await sigin(rest);
      navigate("/");
      console.log({ res, res2, name });
    } catch (_error) {
      const error = _error as { message?: string };
      const msgError = error.message ?? "Somthing wenr wrong during register";
      setErrorMsg(msgError);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-6 md:min-w-80 min-w-64"
      >
        <div className=" flex flex-col  mb-4">
          <p className=" text-2xl font-bold text-center text-nowrap mb-4">
            Create your account
          </p>
          <p className=" text-center">
            👋 Please enter your personal details below
          </p>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Jonas@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Jonas@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDestructive msg={errMsg} />
        <Button type="submit"> Sign Up</Button>
        <Button type="button" variant="link" onClick={() => navigate("/sigin")}>
          Already have an account? Sign in here
        </Button>
      </form>
    </Form>
  );
};

export default SignupPage;
