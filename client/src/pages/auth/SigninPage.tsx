import React from "react";
import { z } from "zod";
import { Input } from "@src/components/ui/input";
import { Button } from "@src/components/ui/button";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signinMutaion } from "@src/api/services/signin";
import { AlertDestructive } from "@src/components/AlertDestructive";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/components/ui/form";
const schema = z.object({
  email: z.string().email().min(1, {
    message: "Email is Required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

type TSchema = z.infer<typeof schema>;

const SigninPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(signinMutaion());
  const [errMsg, setErrorMsg] = React.useState("");
  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TSchema> = async (data) => {
    try {
      setErrorMsg("");
      await mutateAsync(data);
      navigate("/");
    } catch (_error) {
      const error = _error as { message: string };
      const msgError = error.message ?? "Somthing went wront try again";
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
            Welcome back
          </p>
          <p className=" text-center">👋 Glade to see you again</p>
        </div>
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
                <Input placeholder="123456" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDestructive msg={errMsg} />
        <Button type="submit">Login</Button>
        <Button
          type="button"
          variant="link"
          onClick={() => navigate("/signup")}
        >
          Dont have an account?
        </Button>
      </form>
    </Form>
  );
};

export default SigninPage;
