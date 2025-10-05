import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronRight,
  Globe,
  Home,
  Network,
  PanelLeft,
  Server,
  Table,
  Webhook,
} from "lucide-react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import ClerkHeader from "../integrations/clerk/header-user.tsx";

function SidebarNavigation() {
  const { setOpenMobile } = useSidebar();
  const [groupedExpanded, setGroupedExpanded] = useState<
    Record<string, boolean>
  >({});

  const navigationLinkClass =
    "flex items-center gap-3 w-full justify-start text-left h-auto p-3 rounded-lg transition-colors hover:bg-muted";
  const activeLinkClass =
    "bg-primary text-primary-foreground hover:bg-primary/90";

  return (
    <Sidebar className="border-r" variant="floating">
      <SidebarHeader className="border-b p-4">
        <h2 className="font-bold text-xl">Navigation</h2>
        <p className="text-muted-foreground text-sm">
          Explore the TanStack Start demos and features
        </p>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                activeProps={{
                  className: cn(navigationLinkClass, activeLinkClass),
                }}
                className={navigationLinkClass}
                onClick={() => setOpenMobile(false)}
                to="/"
              >
                <Home size={20} />
                <span className="font-medium">Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                activeProps={{
                  className: cn(navigationLinkClass, activeLinkClass),
                }}
                className={navigationLinkClass}
                onClick={() => setOpenMobile(false)}
                to="/demo/start/server-funcs"
              >
                <Server size={20} />
                <span className="font-medium">Start - Server Functions</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                activeProps={{
                  className: cn(navigationLinkClass, activeLinkClass),
                }}
                className={navigationLinkClass}
                onClick={() => setOpenMobile(false)}
                to="/demo/start/api-request"
              >
                <Server size={20} />
                <span className="font-medium">Start - API Request</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Collapsible
              onOpenChange={(open) =>
                setGroupedExpanded((prev) => ({
                  ...prev,
                  StartSSRDemo: open,
                }))
              }
              open={groupedExpanded.StartSSRDemo}
            >
              <div className="mb-2 flex flex-row items-center justify-between">
                <SidebarMenuButton asChild className="flex-1">
                  <Link
                    activeProps={{
                      className: cn(navigationLinkClass, activeLinkClass),
                    }}
                    className={navigationLinkClass}
                    onClick={() => setOpenMobile(false)}
                    to="/demo/start/ssr"
                  >
                    <Server size={20} />
                    <span className="font-medium">Start - SSR Demos</span>
                  </Link>
                </SidebarMenuButton>
                <CollapsibleTrigger asChild>
                  <Button className="h-8 w-8" size="icon" variant="ghost">
                    {groupedExpanded.StartSSRDemo ? (
                      <ChevronDown size={20} />
                    ) : (
                      <ChevronRight size={20} />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="ml-4 space-y-1">
                <SidebarMenuButton asChild>
                  <Link
                    activeProps={{
                      className: cn(navigationLinkClass, activeLinkClass),
                    }}
                    className={navigationLinkClass}
                    onClick={() => setOpenMobile(false)}
                    to="/demo/start/ssr/spa-mode"
                  >
                    <Server size={20} />
                    <span className="font-medium">SPA Mode</span>
                  </Link>
                </SidebarMenuButton>

                <SidebarMenuButton asChild>
                  <Link
                    activeProps={{
                      className: cn(navigationLinkClass, activeLinkClass),
                    }}
                    className={navigationLinkClass}
                    onClick={() => setOpenMobile(false)}
                    to="/demo/start/ssr/full-ssr"
                  >
                    <Server size={20} />
                    <span className="font-medium">Full SSR</span>
                  </Link>
                </SidebarMenuButton>

                <SidebarMenuButton asChild>
                  <Link
                    activeProps={{
                      className: cn(navigationLinkClass, activeLinkClass),
                    }}
                    className={navigationLinkClass}
                    onClick={() => setOpenMobile(false)}
                    to="/demo/start/ssr/data-only"
                  >
                    <Server size={20} />
                    <span className="font-medium">Data Only</span>
                  </Link>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                activeProps={{
                  className: cn(navigationLinkClass, activeLinkClass),
                }}
                className={navigationLinkClass}
                onClick={() => setOpenMobile(false)}
                to="/demo/clerk"
              >
                <Globe size={20} />
                <span className="font-medium">Clerk</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                activeProps={{
                  className: cn(navigationLinkClass, activeLinkClass),
                }}
                className={navigationLinkClass}
                onClick={() => setOpenMobile(false)}
                to="/demo/convex"
              >
                <Globe size={20} />
                <span className="font-medium">Convex</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                activeProps={{
                  className: cn(navigationLinkClass, activeLinkClass),
                }}
                className={navigationLinkClass}
                onClick={() => setOpenMobile(false)}
                to="/demo/mcp-todos"
              >
                <Webhook size={20} />
                <span className="font-medium">MCP</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                activeProps={{
                  className: cn(navigationLinkClass, activeLinkClass),
                }}
                className={navigationLinkClass}
                onClick={() => setOpenMobile(false)}
                to="/demo/tanstack-query"
              >
                <Network size={20} />
                <span className="font-medium">TanStack Query</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                activeProps={{
                  className: cn(navigationLinkClass, activeLinkClass),
                }}
                className={navigationLinkClass}
                onClick={() => setOpenMobile(false)}
                to="/demo/table"
              >
                <Table size={20} />
                <span className="font-medium">TanStack Table</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                activeProps={{
                  className: cn(navigationLinkClass, activeLinkClass),
                }}
                className={navigationLinkClass}
                onClick={() => setOpenMobile(false)}
                to="/demo/orpc-todo"
              >
                <Network size={20} />
                <span className="font-medium">oRPC Todo</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="mt-auto border-t pt-4">
          <ClerkHeader />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarNavigation />
      <div className="flex-1">
        <header className="flex items-center border-b bg-background p-4 shadow-sm">
          <SidebarTrigger className="lg:hidden">
            <PanelLeft size={24} />
          </SidebarTrigger>

          <h1 className="ml-4 font-semibold text-xl">
            <Link to="/">
              <img
                alt="TanStack Logo"
                className="h-10"
                src="/tanstack-word-logo-white.svg"
              />
            </Link>
          </h1>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
