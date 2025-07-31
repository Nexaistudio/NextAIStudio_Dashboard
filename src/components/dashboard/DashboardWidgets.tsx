import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Image, 
  Video, 
  Users, 
  Sparkles, 
  Clock, 
  ArrowRight,
  Palette,
  Zap
} from "lucide-react";

export function DashboardWidgets() {
  const stats = [
    {
      title: "Total Projects",
      value: "24",
      change: "+12%",
      icon: TrendingUp,
      color: "text-primary"
    },
    {
      title: "AI Visuals Generated",
      value: "1,247",
      change: "+23%",
      icon: Image,
      color: "text-blue-400"
    },
    {
      title: "Storyboards",
      value: "18",
      change: "+8%",
      icon: Video,
      color: "text-purple-400"
    },
    {
      title: "Active Clients",
      value: "7",
      change: "+2",
      icon: Users,
      color: "text-green-400"
    }
  ];

  const recentActivities = [
    {
      action: "Created brand kit",
      time: "3 hours ago",
      status: "completed"
    },
    {
      action: "Generated AI logo variations",
      time: "5 hours ago",
      status: "completed"
    },
    {
      action: "Storyboard render in progress",
      time: "1 day ago",
      status: "processing"
    },
    {
      action: "Shared project with client",
      time: "2 days ago",
      status: "completed"
    }
  ];

  const aiSuggestions = [
    {
      title: "Neon Glitch Typography",
      description: "Try a cyberpunk aesthetic for your next tech brand",
      category: "Typography",
      icon: Zap
    },
    {
      title: "Organic Flow Animations",
      description: "Perfect for wellness and lifestyle brands",
      category: "Animation",
      icon: Sparkles
    },
    {
      title: "Retro Synthwave Palette",
      description: "80s-inspired colors trending in design",
      category: "Color",
      icon: Palette
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-glass backdrop-blur-glass border-white/10 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-sm ${stat.color} flex items-center gap-1`}>
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-ai opacity-80`}>
                  <stat.icon className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="bg-glass backdrop-blur-glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
                <div>
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
                <Badge 
                  variant={activity.status === "completed" ? "default" : "secondary"}
                  className={activity.status === "completed" ? "bg-primary/20 text-primary" : ""}
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              View All Activities
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* AI Creative Suggestions */}
        <Card className="bg-glass backdrop-blur-glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Creative Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="p-4 rounded-lg bg-gradient-glass border border-white/5 hover:border-primary/20 transition-colors group cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <suggestion.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground">{suggestion.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </div>
                </div>
              </div>
            ))}
            <Button className="w-full bg-gradient-ai hover:shadow-glow">
              Explore More AI Ideas
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}