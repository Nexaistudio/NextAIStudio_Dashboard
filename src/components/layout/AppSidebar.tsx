import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Sparkles,
  FolderOpen,
  Image,
  Palette,
  Film,
  Settings,
  User
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "AI Tools", url: "/ai-tools", icon: Sparkles },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Assets", url: "/assets", icon: Image },
  { title: "Brand Kit", url: "/brand-kit", icon: Palette },
  { title: "Storyboard", url: "/storyboard", icon: Film },
];

const bottomItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const isCollapsed = state === "collapsed";

  const getNavClasses = (path: string) => {
    const baseClasses = "transition-all duration-200 group relative";
    const activeClasses = isActive(path)
      ? "bg-primary/10 text-primary border-r-2 border-primary"
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";
    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} bg-sidebar border-r border-sidebar-border`}>
      {/* Logo section */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="px-4 py-2">
            <a href="https://nexaistudio.com/">
              <img
                src="/NexAI Studio.png"
                alt="CreativeAI Logo"
                className="w-full h-auto object-contain"
              />
            </a>
          </div>

          {!isCollapsed && (
            <div>

            </div>
          )}
        </div>
      </div>


      <SidebarContent className="flex flex-col justify-between h-full">
        {/* Main navigation */}
        <div className="flex-1">
          <SidebarGroup>
            {!isCollapsed && (
              <SidebarGroupLabel className="text-muted-foreground px-4 py-2 text-xs uppercase tracking-wide">
                Main
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1 px-2">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={getNavClasses(item.url)}
                      >
                        <item.icon className={`h-5 w-5 ${isActive(item.url) ? 'text-primary' : ''}`} />
                        {!isCollapsed && (
                          <span className="ml-3 font-medium">{item.title}</span>
                        )}
                        {isActive(item.url) && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Bottom navigation */}
        <div className="border-t border-sidebar-border pt-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1 px-2">
                {bottomItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={getNavClasses(item.url)}
                      >
                        <item.icon className={`h-5 w-5 ${isActive(item.url) ? 'text-primary' : ''}`} />
                        {!isCollapsed && (
                          <span className="ml-3 font-medium">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Collapse toggle */}
        <div className="p-2 border-t border-sidebar-border">
          <SidebarTrigger className="w-full justify-center hover:bg-muted/50 rounded-lg p-2" />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}