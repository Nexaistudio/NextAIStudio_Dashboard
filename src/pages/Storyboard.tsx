
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Film, Plus, Play, Download, Share, Edit, Trash2, Clock, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Scene {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  notes: string;
}

interface Storyboard {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  author: string;
  status: "Draft" | "In Review" | "Approved";
  scenes: Scene[];
  totalDuration: string;
}

const mockStoryboards: Storyboard[] = [
  {
    id: "1",
    title: "Product Launch Video",
    description: "30-second promotional video for new product launch",
    createdAt: "2024-01-15",
    author: "John Doe",
    status: "In Review",
    totalDuration: "00:30",
    scenes: [
      {
        id: "s1",
        title: "Opening Hook",
        description: "Dramatic product reveal with dynamic lighting",
        duration: "00:05",
        thumbnail: "/placeholder.svg",
        notes: "Use dramatic lighting, close-up shot"
      },
      {
        id: "s2",
        title: "Feature Showcase",
        description: "Highlight key product features with smooth transitions",
        duration: "00:15",
        thumbnail: "/placeholder.svg",
        notes: "Split screen layout, focus on USPs"
      },
      {
        id: "s3",
        title: "Call to Action",
        description: "Strong CTA with brand elements and contact information",
        duration: "00:10",
        thumbnail: "/placeholder.svg",
        notes: "Include website URL and social media handles"
      }
    ]
  },
  {
    id: "2",
    title: "Brand Story Video",
    description: "Behind-the-scenes look at company culture and values",
    createdAt: "2024-01-12",
    author: "Sarah Wilson",
    status: "Draft",
    totalDuration: "01:30",
    scenes: []
  }
];

export default function Storyboard() {
  const [selectedStoryboard, setSelectedStoryboard] = useState<Storyboard | null>(null);
  const [newSceneTitle, setNewSceneTitle] = useState("");
  const [newSceneDescription, setNewSceneDescription] = useState("");

  const getStatusColor = (status: Storyboard['status']) => {
    switch (status) {
      case "Draft": return "bg-muted text-muted-foreground";
      case "In Review": return "bg-primary/20 text-primary";
      case "Approved": return "bg-green-500/20 text-green-500";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const StoryboardCard = ({ storyboard }: { storyboard: Storyboard }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {storyboard.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{storyboard.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedStoryboard(storyboard)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Play className="h-4 w-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Export
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Badge className={getStatusColor(storyboard.status)}>
            {storyboard.status}
          </Badge>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {storyboard.totalDuration}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {storyboard.author}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {storyboard.scenes.slice(0, 3).map((scene) => (
            <div key={scene.id} className="aspect-video bg-muted rounded overflow-hidden">
              <img src={scene.thumbnail} alt={scene.title} className="w-full h-full object-cover" />
            </div>
          ))}
          {storyboard.scenes.length === 0 && (
            <div className="col-span-3 aspect-video bg-muted rounded flex items-center justify-center">
              <span className="text-muted-foreground text-sm">No scenes yet</span>
            </div>
          )}
        </div>
        <div className="mt-3 text-sm text-muted-foreground">
          {storyboard.scenes.length} scenes • Created {new Date(storyboard.createdAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );

  const SceneCard = ({ scene, index }: { scene: Scene; index: number }) => (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-24 h-16 bg-muted rounded flex-shrink-0 overflow-hidden relative">
            <img src={scene.thumbnail} alt={scene.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-1 right-1 bg-background/80 text-xs px-1 rounded">
              {scene.duration}
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-sm">
                  Scene {index + 1}: {scene.title}
                </h4>
                <p className="text-xs text-muted-foreground">{scene.description}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Edit className="h-3 w-3" />
              </Button>
            </div>
            {scene.notes && (
              <p className="text-xs text-muted-foreground italic">
                Notes: {scene.notes}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (selectedStoryboard) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setSelectedStoryboard(null)}
              >
                ← Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{selectedStoryboard.title}</h1>
                <p className="text-muted-foreground mt-1">{selectedStoryboard.description}</p>
              </div>
            </div>
            <div className="flex gap-2 self-start sm:self-auto">
              <Button variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button className="bg-gradient-ai hover:shadow-glow transition-all duration-300">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Storyboard Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Storyboard Details</CardTitle>
                <Badge className={getStatusColor(selectedStoryboard.status)}>
                  {selectedStoryboard.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total Duration:</span>
                  <div className="font-semibold">{selectedStoryboard.totalDuration}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Scenes:</span>
                  <div className="font-semibold">{selectedStoryboard.scenes.length}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <div className="font-semibold">{new Date(selectedStoryboard.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scenes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Scenes</h2>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Scene
              </Button>
            </div>

            {selectedStoryboard.scenes.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Film className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No scenes yet</h3>
                  <p className="text-muted-foreground mb-4">Start building your storyboard by adding your first scene</p>
                  <Button className="bg-gradient-ai hover:shadow-glow">
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Scene
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {selectedStoryboard.scenes.map((scene, index) => (
                  <SceneCard key={scene.id} scene={scene} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Film className="h-8 w-8 text-primary" />
              Storyboards
            </h1>
            <p className="text-muted-foreground mt-1">Create and manage your video storyboards</p>
          </div>
          <Button className="bg-gradient-ai hover:shadow-glow transition-all duration-300 self-start sm:self-auto">
            <Plus className="h-4 w-4 mr-2" />
            New Storyboard
          </Button>
        </div>

        {/* Storyboards Grid */}
        {mockStoryboards.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Film className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No storyboards yet</h3>
              <p className="text-muted-foreground mb-4">Create your first storyboard to start planning your video content</p>
              <Button className="bg-gradient-ai hover:shadow-glow">
                <Plus className="h-4 w-4 mr-2" />
                Create Storyboard
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStoryboards.map((storyboard) => (
              <StoryboardCard key={storyboard.id} storyboard={storyboard} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
