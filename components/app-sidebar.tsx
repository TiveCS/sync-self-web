import { User } from '@/models/users';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import { LogoutButton } from './logout-button';

export type AppSidebarProps = {
  user: User;
};

export function AppSidebar({ user }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Home" asChild>
              <Link href="/expenses">
                <HomeIcon /> <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
