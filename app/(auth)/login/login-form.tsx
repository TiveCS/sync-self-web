'use client';

import { actionSignIn } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signInSchema } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { toast } from 'sonner';

export function LoginForm() {
  const { form, handleSubmitWithAction } = useHookFormAction(
    actionSignIn,
    zodResolver(signInSchema),
    {
      actionProps: {
        onError: (error) => {
          toast.error('err: ' + error.error.serverError);
        },
        onExecute: () => {
          toast.info('Signing in...');
        },
        onSuccess: () => {
          toast.success('Sign in successfully');
        },
      },
      formProps: {
        defaultValues: {
          email: '',
          password: '',
        },
      },
    }
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    inputMode="email"
                    placeholder="e.g. johndoe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
