import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, List, Activity } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/create', icon: PlusCircle, label: 'New Job' },
  { to: '/jobs', icon: List, label: 'All Jobs' },
];

function NavItem({ to, icon: Icon, label }: { to: string; icon: typeof LayoutDashboard; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        clsx(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-indigo-600/20 text-indigo-400'
            : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200',
        )
      }
    >
      <Icon className="h-4 w-4" />
      {label}
    </NavLink>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      <aside className="flex w-60 flex-col border-r border-gray-800 bg-gray-900">
        <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-4">
          <Activity className="h-5 w-5 text-indigo-500" />
          <span className="text-sm font-semibold text-gray-100">Loopreel Admin</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>
        <div className="border-t border-gray-800 p-4 text-xs text-gray-600">
          API: localhost:3000
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
