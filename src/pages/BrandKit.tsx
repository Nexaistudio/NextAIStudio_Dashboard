
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette, Type, Image, Download, Copy, Plus, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  usage: string;
}

interface Typography {
  id: string;
  name: string;
  fontFamily: string;
  usage: string;
  weights: string[];
}

interface BrandAsset {
  id: string;
  name: string;
  type: "logo" | "icon" | "pattern";
  thumbnail: string;
  formats: string[];
}

const mockColors: ColorPalette[] = [
  {
    id: "1",
    name: "Primary",
    colors: ["#79E7C3", "#5DD4A6", "#42C189", "#2AAE6C"],
    usage: "Main brand colors, buttons, highlights"
  },
  {
    id: "2",
    name: "Secondary",
    colors: ["#1A1F2E", "#2A3441", "#3A4A57", "#4A5F6D"],
    usage: "Backgrounds, text, subtle elements"
  },
  {
    id: "3",
    name: "Accent",
    colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A"],
    usage: "Error states, warnings, highlights"
  }
];

const mockTypography: Typography[] = [
  {
    id: "1",
    name: "Primary",
    fontFamily: "Inter",
    usage: "Headings, body text, interface",
    weights: ["400", "500", "600", "700", "800"]
  },
  {
    id: "2",
    name: "Display",
    fontFamily: "Plus Jakarta Sans",
    usage: "Large headings, hero sections",
    weights: ["600", "700", "800"]
  },
  {
    id: "3",
    name: "Mono",
    fontFamily: "JetBrains Mono",
    usage: "Code, technical content",
    weights: ["400", "500", "600"]
  }
];

const mockAssets: BrandAsset[] = [
  {
    id: "1",
    name: "Primary Logo",
    type: "logo",
    thumbnail: "/placeholder.svg",
    formats: ["SVG", "PNG", "PDF"]
  },
  {
    id: "2",
    name: "Logo Mark",
    type: "icon",
    thumbnail: "/placeholder.svg",
    formats: ["SVG", "PNG"]
  },
  {
    id: "3",
    name: "Brand Pattern",
    type: "pattern",
    thumbnail: "/placeholder.svg",
    formats: ["SVG", "PNG"]
  }
];

export default function BrandKit() {
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const ColorCard = ({ palette }: { palette: ColorPalette }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          {palette.name}
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(palette.colors.join(", "))}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{palette.usage}</p>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          {palette.colors.map((color, index) => (
            <div
              key={index}
              className="flex-1 aspect-square rounded-lg cursor-pointer hover:scale-105 transition-transform"
              style={{ backgroundColor: color }}
              onClick={() => copyToClipboard(color)}
              title={`Click to copy ${color}`}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {palette.colors.map((color, index) => (
            <div
              key={index}
              className="font-mono text-center p-1 rounded bg-muted cursor-pointer hover:bg-muted/80"
              onClick={() => copyToClipboard(color)}
            >
              {color}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const TypographyCard = ({ typography }: { typography: Typography }) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span style={{ fontFamily: typography.fontFamily }}>
            {typography.name}
          </span>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{typography.usage}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-sm font-medium">Font Family: {typography.fontFamily}</div>
          <div className="flex flex-wrap gap-2">
            {typography.weights.map((weight) => (
              <Badge key={weight} variant="outline">
                {weight}
              </Badge>
            ))}
          </div>
          <div className="space-y-2">
            <div style={{ fontFamily: typography.fontFamily, fontSize: "24px", fontWeight: "700" }}>
              The quick brown fox
            </div>
            <div style={{ fontFamily: typography.fontFamily, fontSize: "16px", fontWeight: "400" }}>
              The quick brown fox jumps over the lazy dog
            </div>
            <div style={{ fontFamily: typography.fontFamily, fontSize: "14px", fontWeight: "400" }}>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 1234567890
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const AssetCard = ({ asset }: { asset: BrandAsset }) => (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="aspect-square bg-muted rounded-lg mb-3 relative overflow-hidden">
          <img src={asset.thumbnail} alt={asset.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="secondary" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">{asset.name}</h3>
          <div className="flex flex-wrap gap-1">
            {asset.formats.map((format) => (
              <Badge key={format} variant="outline" className="text-xs">
                {format}
              </Badge>
            ))}
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
              <Palette className="h-8 w-8 text-primary" />
              Brand Kit
            </h1>
            <p className="text-muted-foreground mt-1">Your complete brand identity toolkit</p>
          </div>
          <div className="flex gap-2 self-start sm:self-auto">
            <Button variant="outline">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Generate
            </Button>
            <Button className="bg-gradient-ai hover:shadow-glow transition-all duration-300">
              <Plus className="h-4 w-4 mr-2" />
              Add Element
            </Button>
          </div>
        </div>

        <Tabs defaultValue="colors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:flex">
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="assets" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Assets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Color Palettes</h2>
                <p className="text-muted-foreground">Brand colors and their usage guidelines</p>
              </div>
              <Button variant="outline">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Palette
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockColors.map((palette) => (
                <ColorCard key={palette.id} palette={palette} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Typography</h2>
                <p className="text-muted-foreground">Font families and text styling guidelines</p>
              </div>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Font
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockTypography.map((typography) => (
                <TypographyCard key={typography.id} typography={typography} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assets" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Brand Assets</h2>
                <p className="text-muted-foreground">Logos, icons, and brand elements</p>
              </div>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Upload Asset
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {mockAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
