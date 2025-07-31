
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Upload, Search, Filter, Download, Share, Trash2, Grid3X3, List } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Asset {
  id: string;
  name: string;
  type: "image" | "video" | "audio" | "document";
  size: string;
  format: string;
  createdAt: string;
  thumbnail: string;
  tags: string[];
}

const mockAssets: Asset[] = [
  {
    id: "1",
    name: "AI Generated Logo",
    type: "image",
    size: "2.4 MB",
    format: "PNG",
    createdAt: "2024-01-15",
    thumbnail: "/placeholder.svg",
    tags: ["logo", "ai-generated", "brand"]
  },
  {
    id: "2",
    name: "Product Demo Video",
    type: "video",
    size: "45.2 MB",
    format: "MP4",
    createdAt: "2024-01-14",
    thumbnail: "/placeholder.svg",
    tags: ["video", "demo", "product"]
  },
  {
    id: "3",
    name: "Brand Colors Palette",
    type: "image",
    size: "856 KB",
    format: "SVG",
    createdAt: "2024-01-12",
    thumbnail: "/placeholder.svg",
    tags: ["colors", "brand", "palette"]
  }
];

export default function Assets() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTab = activeTab === "all" || asset.type === activeTab;
    return matchesSearch && matchesTab;
  });

  const getTypeIcon = (type: Asset['type']) => {
    switch (type) {
      case "image": return "🖼️";
      case "video": return "🎥";
      case "audio": return "🎵";
      case "document": return "📄";
      default: return "📁";
    }
  };

  const AssetCard = ({ asset }: { asset: Asset }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50">
      <CardContent className="p-4">
        <div className="aspect-square bg-muted rounded-lg mb-3 relative overflow-hidden">
          <img src={asset.thumbnail} alt={asset.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Badge variant="secondary" className="text-xs">
              {asset.format}
            </Badge>
          </div>
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="h-8 w-8">
                  <Share className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
            {asset.name}
          </h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{getTypeIcon(asset.type)} {asset.size}</span>
            <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {asset.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {asset.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{asset.tags.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const AssetListItem = ({ asset }: { asset: Asset }) => (
    <Card className="group hover:shadow-md transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
            <img src={asset.thumbnail} alt={asset.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold group-hover:text-primary transition-colors truncate">
              {asset.name}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span>{getTypeIcon(asset.type)} {asset.format}</span>
              <span>{asset.size}</span>
              <span>{new Date(asset.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {asset.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                <Share className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
              <Image className="h-8 w-8 text-primary" />
              Assets
            </h1>
            <p className="text-muted-foreground mt-1">Manage your creative assets and media</p>
          </div>
          <Button className="bg-gradient-ai hover:shadow-glow transition-all duration-300 self-start sm:self-auto">
            <Upload className="h-4 w-4 mr-2" />
            Upload Assets
          </Button>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
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
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:flex">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="image">Images</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="document">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredAssets.length === 0 ? (
              <div className="text-center py-12">
                <Image className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No assets found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? "Try adjusting your search" : "Upload your first asset to get started"}
                </p>
                <Button className="bg-gradient-ai hover:shadow-glow">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Assets
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredAssets.map((asset) => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAssets.map((asset) => (
                  <AssetListItem key={asset.id} asset={asset} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
