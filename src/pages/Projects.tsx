
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderOpen, Search, Plus, Grid3X3, List, MoreVertical, Calendar, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "In Progress" | "Completed" | "Draft";
  createdAt: string;
  author: string;
  type: "Video" | "Design" | "Brand" | "Storyboard";
  thumbnail: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "AI Fashion Campaign",
    description: "Modern fashion brand visual identity with AI-generated assets",
    status: "In Progress",
    createdAt: "2024-01-15",
    author: "John Doe",
    type: "Brand",
    thumbnail: "/placeholder.svg"
  },
  {
    id: "2",
    title: "Tech Startup Video",
    description: "Promotional video for emerging tech company",
    status: "Completed",
    createdAt: "2024-01-12",
    author: "Sarah Wilson",
    type: "Video",
    thumbnail: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Product Storyboard",
    description: "Visual narrative for new product launch",
    status: "Draft",
    createdAt: "2024-01-10",
    author: "Mike Chen",
    type: "Storyboard",
    thumbnail: "/placeholder.svg"
  }
];

export default function Projects() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || 
                      (activeTab === "in-progress" && project.status === "In Progress") ||
                      (activeTab === "completed" && project.status === "Completed") ||
                      (activeTab === "draft" && project.status === "Draft");
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case "In Progress": return "bg-primary/20 text-primary";
      case "Completed": return "bg-green-500/20 text-green-500";
      case "Draft": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const ProjectCard = ({ project }: { project: Project }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50">
      <CardHeader className="pb-3">
        <div className="aspect-video bg-muted rounded-lg mb-3 relative overflow-hidden">
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <Badge className={`absolute top-2 right-2 ${getStatusColor(project.status)}`}>
            {project.status}
          </Badge>
        </div>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {project.author}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(project.createdAt).toLocaleDateString()}
          </div>
        </div>
        <Badge variant="outline" className="mt-2 text-xs">
          {project.type}
        </Badge>
      </CardContent>
    </Card>
  );

  const ProjectListItem = ({ project }: { project: Project }) => (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold group-hover:text-primary transition-colors truncate">
                {project.title}
              </h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
              {project.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
              <Badge variant="outline">{project.type}</Badge>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {project.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <FolderOpen className="h-8 w-8 text-primary" />
              Projects
            </h1>
            <p className="text-muted-foreground mt-1">Manage your creative projects</p>
          </div>
          <Button className="bg-gradient-ai hover:shadow-glow transition-all duration-300 self-start sm:self-auto">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:flex">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <FolderOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? "Try adjusting your search" : "Create your first project to get started"}
                </p>
                <Button className="bg-gradient-ai hover:shadow-glow">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <ProjectListItem key={project.id} project={project} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
