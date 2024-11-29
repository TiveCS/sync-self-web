import { actionGetMe } from '@/actions/auth';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function ExpensesLayout({
  children,
}: React.PropsWithChildren) {
  const getMe = await actionGetMe();

  if (!getMe?.data) {
    return redirect('/login');
  }

  return (
    <SidebarProvider>
      <AppSidebar user={getMe.data} />

      <SidebarInset>
        <main className="flex flex-1 flex-col p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
