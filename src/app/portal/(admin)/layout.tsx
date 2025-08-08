"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Users,
  Settings,
  BarChart3,
  LogOut,
  User,
  Bell,
  Search,
  ChevronDown,
  Home,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import InitialsAvatar from "@/components/InitialsAvatar";

// Mock user data - replace with your auth context
const mockUser = {
  username: "Alex Morgan",
  email: "alex@company.com",
  roles: ["ADMIN"],
  avatar: "AM",
};

const navItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/portal/dashboard",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "User Management",
    icon: Users,
    url: "/portal/users",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    url: "/portal/reports",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/portal/settings",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
    router.push("/login");
  };

  return (
    <Sidebar variant="inset" className="border-r border-slate-200/60">
      <SidebarHeader className="border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-bold text-slate-900">
              Admin Portal
            </span>
            <span className="truncate text-xs text-slate-500 font-medium">
              Management Hub
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        group rounded-lg px-3 py-2.5 transition-all duration-200 hover:scale-[1.02]
                        ${
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                            : "hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                        }
                      `}
                      onClick={() => router.push(item.url)}
                    >
                      <a
                        href={item.url}
                        className="flex items-center gap-3 w-full"
                      >
                        <div
                          className={`
                          p-1.5 rounded-md transition-colors
                          ${
                            isActive
                              ? "bg-white/20 text-white"
                              : `${item.bgColor} ${item.color} group-hover:scale-110`
                          }
                        `}
                        >
                          <item.icon className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200/60 bg-slate-50/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="group rounded-xl p-3 hover:bg-white hover:shadow-md transition-all duration-200 data-[state=open]:bg-white data-[state=open]:shadow-md"
                >
                  <Avatar className="h-9 w-9 rounded-xl border-2 border-white shadow-md">
                    <AvatarFallback>
                      <InitialsAvatar
                        firstName={user?.firstName || "firstName"}
                        lastName={user?.lastName || "lastName"}
                        className="w-full h-full text-lg"
                      />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-slate-900">
                      {user?.firstName || "firstName"}{" "}
                      {user?.lastName || "lastName"}
                    </span>
                    <span className="truncate text-xs text-slate-500 font-medium">
                      {user?.email || "email@example.com"}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 rounded-xl shadow-xl border border-slate-200 bg-white"
                side="bottom"
                align="end"
                sideOffset={8}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-3 px-3 py-3 bg-slate-50 rounded-t-xl">
                    <Avatar className="h-10 w-10 rounded-xl border-2 border-white shadow-md">
                      <AvatarFallback className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                   <InitialsAvatar
                        firstName={user?.firstName || "firstName"}
                        lastName={user?.lastName || "lastName"}
                        className="w-full h-full text-lg"
                      />
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold text-slate-900">
                        {user?.firstName || mockUser.username}{" "}
                        {user?.lastName || ""}
                      </span>
                      <span className="truncate text-xs text-slate-500 font-medium">
                        {user?.email || mockUser.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <div className="p-1">
                  <DropdownMenuItem className="rounded-lg px-3 py-2.5 hover:bg-slate-50 transition-colors">
                    <User className="mr-3 h-4 w-4 text-slate-500" />
                    <span className="font-medium">Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-lg px-3 py-2.5 hover:bg-slate-50 transition-colors">
                    <Settings className="mr-3 h-4 w-4 text-slate-500" />
                    <span className="font-medium">Preferences</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="rounded-lg px-3 py-2.5 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors font-medium"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [notifications] = useState(3); // Mock notification count

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl px-6 shadow-sm">
          <SidebarTrigger className="-ml-2 hover:bg-slate-100 rounded-lg transition-colors" />

          <div className="flex flex-1 items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search anything..."
                className="pl-10 border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 rounded-xl transition-all duration-200"
              />
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl hover:bg-slate-100 transition-colors"
              >
                <Bell className="h-4 w-4 text-slate-600" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium shadow-lg">
                    {notifications}
                  </span>
                )}
              </Button>

              <div className="flex items-center gap-3">
                <Badge
                  variant="secondary"
                  className="hidden sm:inline-flex bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0 font-medium px-3 py-1 rounded-full"
                >
                  {user?.roles?.join(", ") || mockUser.roles.join(", ")}
                </Badge>
                <Avatar className="h-9 w-9 rounded-xl border-2 border-white shadow-md ring-2 ring-slate-100">
                  <AvatarFallback className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                               <InitialsAvatar
                        firstName={user?.firstName || "firstName"}
                        lastName={user?.lastName || "lastName"}
                        className="w-full h-full text-lg"
                      />
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 pt-8 bg-slate-50/30 min-h-screen">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
