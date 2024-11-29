'use client';

import { ResponsiveModal } from '@/components/responsive-modal';
import { LoginForm } from './login-form';
import { Button } from '@/components/ui/button';

export function LoginModal() {
  return (
    <ResponsiveModal
      title="Sign In"
      description="Sign in to start take note of your expenses"
      trigger={<Button>Sign In</Button>}
    >
      <LoginForm />
    </ResponsiveModal>
  );
}
