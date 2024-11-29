'use client';

import { useAction } from 'next-safe-action/hooks';
import { Button } from './ui/button';
import { actionSignOut } from '@/actions/auth';
import { LogOutIcon } from 'lucide-react';

export function LogoutButton() {
  const { execute: signOut } = useAction(actionSignOut);

  return (
    <Button variant="destructive-outline" onClick={() => signOut()}>
      <LogOutIcon className="size-4" /> <span>Sign Out</span>
    </Button>
  );
}

LogoutButton.displayName = 'LogoutButton';
