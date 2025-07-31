
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { User, Calendar, Award, TrendingUp, Zap, Crown, Settings, Camera } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

interface Activity {
  id: string;
  type: "project" | "asset" | "brand" | "storyboard";
  title: string;
  date: string;
  status: string;
}

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "First Project",
    description: "Created your first project",
    icon: "🎯",
    unlocked: true,
    date: "2024-01-10"
  },
  {
    id: "2",
    title: "AI Explorer",
    description: "Used AI tools 10 times",
    icon: "🤖",
    unlocked: true,
    date: "2024-01-12"
  },
  {
    id: "3",
    title: "Brand Master",
    description: "Created a complete brand kit",
    icon: "🎨",
    unlocked: false
  },
  {
    id: "4",
    title: "Video Storyteller",
    description: "Completed 5 storyboards",
    icon: "🎬",
    unlocked: false
  }
];

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "project",
    title: "AI Fashion Campaign",
    date: "2024-01-15",
    status: "In Progress"
  },
  {
    id: "2",
    type: "asset",
    title: "Uploaded brand logos",
    date: "2024-01-14",
    status: "Completed"
  },
  {
    id: "3",
    type: "storyboard",
    title: "Product Launch Video",
    date: "2024-01-12",
    status: "In Review"
  }
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const stats = {
    projectsCreated: 12,
    assetsUploaded: 48,
    aiGenerations: 156,
    storageUsed: 2.4,
    storageTotal: 10
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case "project": return "📁";
      case "asset": return "🖼️";
      case "brand": return "🎨";
      case "storyboard": return "🎬";
      default: return "📄";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt="John Doe" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold">John Doe</h1>
                  <p className="text-muted-foreground">Creative Designer & AI Enthusiast</p>
                </div>
                
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <Badge variant="secondary" className="bg-gradient-ai text-primary-foreground">
                    <Crown className="h-3 w-3 mr-1" />
                    Pro Plan
                  </Badge>
                  <Badge variant="outline">
                    <Calendar className="h-3 w-3 mr-1" />
                    Joined Jan 2024
                  </Badge>
                </div>
                
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-muted-foreground">
                  <span>📍 New York, NY</span>
                  <span>🌐 johndoe.design</span>
                  <span>💼 CreativeAI Studio</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button 
                  className="bg-gradient-ai hover:shadow-glow transition-all duration-300"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 lg:w-auto lg:flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center space-y-1">
                        <div className="text-2xl font-bold text-primary">{stats.projectsCreated}</div>
                        <div className="text-sm text-muted-foreground">Projects</div>
                      </div>
                      <div className="text-center space-y-1">
                        <div className="text-2xl font-bold text-primary">{stats.assetsUploaded}</div>
                        <div className="text-sm text-muted-foreground">Assets</div>
                      </div>
                      <div className="text-center space-y-1">
                        <div className="text-2xl font-bold text-primary">{stats.aiGenerations}</div>
                        <div className="text-sm text-muted-foreground">AI Generations</div>
                      </div>
                      <div className="text-center space-y-1">
                        <div className="text-2xl font-bold text-primary">
                          {Math.round((stats.storageUsed / stats.storageTotal) * 100)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Storage Used</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockActivities.slice(0, 3).map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3">
                          <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                          <div className="flex-1">
                            <div className="font-medium">{activity.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(activity.date).toLocaleDateString()}
                            </div>
                          </div>
                          <Badge variant="outline">{activity.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      Plan & Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Storage</span>
                        <span>{stats.storageUsed} GB / {stats.storageTotal} GB</span>
                      </div>
                      <Progress value={(stats.storageUsed / stats.storageTotal) * 100} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>AI Credits</span>
                        <span>1,200 / 2,000</span>
                      </div>
                      <Progress value={60} />
                    </div>
                    <Button variant="outline" className="w-full">
                      Upgrade Plan
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockAchievements.filter(a => a.unlocked).slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="flex items-center gap-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{achievement.title}</div>
                            <div className="text-xs text-muted-foreground">{achievement.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg border">
                      <div className="text-3xl">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <h3 className="font-medium">{activity.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline">{activity.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockAchievements.map((achievement) => (
                <Card key={achievement.id} className={`transition-all duration-300 ${
                  achievement.unlocked 
                    ? "border-primary/50 bg-primary/5" 
                    : "border-muted opacity-60"
                }`}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    {achievement.unlocked ? (
                      <Badge className="bg-gradient-ai text-primary-foreground">
                        Unlocked {achievement.date && new Date(achievement.date).toLocaleDateString()}
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Locked</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Projects Created</span>
                        <span>{stats.projectsCreated}</span>
                      </div>
                      <Progress value={Math.min((stats.projectsCreated / 20) * 100, 100)} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Assets Uploaded</span>
                        <span>{stats.assetsUploaded}</span>
                      </div>
                      <Progress value={Math.min((stats.assetsUploaded / 100) * 100, 100)} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>AI Generations</span>
                        <span>{stats.aiGenerations}</span>
                      </div>
                      <Progress value={Math.min((stats.aiGenerations / 200) * 100, 100)} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Member Since:</span>
                      <div className="font-semibold">January 2024</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Plan:</span>
                      <div className="font-semibold">Pro</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Next Billing:</span>
                      <div className="font-semibold">Feb 15, 2024</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Credits Used:</span>
                      <div className="font-semibold">800 / 2,000</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
