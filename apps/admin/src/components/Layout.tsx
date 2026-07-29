import { NavLink, Outlet } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { LayoutDashboard, PlusCircle, List, Wrench } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/create', icon: PlusCircle, label: 'New Job' },
  { to: '/jobs', icon: List, label: 'Jobs' },
  { to: '/maintenance', icon: Wrench, label: 'Maintenance' },
];

export function Layout() {
  return (
    <SidebarProvider>
      <Sidebar className="w-56 border-r border-border-subtle bg-sidebar">
        <SidebarHeader className="px-4 py-4">
          <span className="text-sm font-semibold tracking-tight text-text-primary">Loopreel</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5 px-2">
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      asChild
                      className="h-8 rounded-md px-2.5 text-[13px] font-medium text-text-tertiary transition-colors hover:bg-surface-hover hover:text-text-primary data-[active=true]:bg-surface-hover data-[active=true]:text-text-primary data-[active=true]:shadow-[inset_3px_0_0_0_#f7f8f8]"
                    >
                      <NavLink to={item.to} end={item.end}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center border-b border-border bg-background px-4">
          <SidebarTrigger className="-ml-1 mr-3 text-text-tertiary hover:text-text-primary" />
          <Separator orientation="vertical" className="mr-3 h-4 bg-border" />
          <span className="text-[13px] text-text-tertiary">Content Admin</span>
        </header>
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
