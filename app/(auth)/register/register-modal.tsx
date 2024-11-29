'use client';

import { ResponsiveModal } from '@/components/responsive-modal';
import { RegisterForm } from './register-form';
import { Button } from '@/components/ui/button';

export function RegisterModal() {
  return (
    <ResponsiveModal
      title="Sign Up"
      description="Sign up to getting started noting your expenses"
      trigger={<Button>Sign Up</Button>}
    >
      <RegisterForm />
    </ResponsiveModal>
  );
}
