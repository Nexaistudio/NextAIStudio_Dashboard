import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Image, 
  Video, 
  Type, 
  Palette, 
  Wand2, 
  ArrowRight,
  Zap
} from "lucide-react";

export default function AITools() {
  const tools = [
    {
      title: "AI Visual Generator",
      description: "Generate stunning visuals from text prompts with multiple style options",
      icon: Image,
      category: "Image Generation",
      status: "Available",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Text-to-Video",
      description: "Transform scripts into engaging video storyboards and animations",
      icon: Video,
      category: "Video Creation",
      status: "Beta",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Smart Typography",
      description: "AI-powered font pairing and typography recommendations",
      icon: Type,
      category: "Typography",
      status: "Available",
      gradient: "from-green-500 to-teal-600"
    },
    {
      title: "Color Palette AI",
      description: "Generate harmonious color schemes based on mood and brand",
      icon: Palette,
      category: "Color Design",
      status: "Available",
      gradient: "from-orange-500 to-red-600"
    },
    {
      title: "Logo Evolution",
      description: "Create multiple logo variations and iterate with AI assistance",
      icon: Wand2,
      category: "Branding",
      status: "Coming Soon",
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      title: "Style Transfer",
      description: "Apply artistic styles to your existing designs and images",
      icon: Zap,
      category: "Style Enhancement",
      status: "Beta",
      gradient: "from-pink-500 to-purple-600"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-primary/20 text-primary";
      case "Beta":
        return "bg-orange-500/20 text-orange-400";
      case "Coming Soon":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Creative Tools</h1>
          <p className="text-muted-foreground">Supercharge your creativity with AI-powered design tools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <Card key={index} className="bg-glass backdrop-blur-glass border-white/10 hover:shadow-glow transition-all duration-300 group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${tool.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}>
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge className={getStatusColor(tool.status)}>
                    {tool.status}
                  </Badge>
                </div>
                <CardTitle className="text-foreground group-hover:text-primary transition-colors">
                  {tool.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {tool.category}
                  </Badge>
                  <Button 
                    size="sm" 
                    className="bg-gradient-ai hover:shadow-glow transition-all duration-300"
                    disabled={tool.status === "Coming Soon"}
                  >
                    {tool.status === "Coming Soon" ? "Soon" : "Launch"}
                    {tool.status !== "Coming Soon" && <ArrowRight className="ml-2 h-3 w-3" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Tool Spotlight */}
        <Card className="bg-gradient-glass border-primary/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-gradient-ai">
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">New: AI Storyboard Generator</h3>
                <p className="text-muted-foreground">Transform your scripts into visual storyboards automatically.</p>
              </div>
            </div>
            <Button className="bg-gradient-ai hover:shadow-glow">
              Try Now
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}