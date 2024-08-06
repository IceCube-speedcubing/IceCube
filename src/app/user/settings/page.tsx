"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Background } from "@/components/Background";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { UserType } from "@/types/UserTypes";
import UserAvatar from "@/components/UserAvatar";

export default function UserSettings({ user }: { user: UserType }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [timerSensitivity, setTimerSensitivity] = useState(50);
  const [cubeType, setCubeType] = useState("3x3");
  const [bio, setBio] = useState("");
  const [language, setLanguage] = useState("en");
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    showStats: true,
    showActivity: false,
  });
  const [avatar, setAvatar] = useState("");
  const [theme, setTheme] = useState("dark");
  const [soundEffects, setSoundEffects] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUsername("SpeedCuber123");
      setEmail("speedcuber@example.com");
      setBio("I love solving Rubik's cubes!");
      setAvatar("https://example.com/avatar.jpg");
    };

    fetchSettings();
  }, []);

  const handleSaveSettings = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully updated.",
    });
  };

  return (
    <div className="container mx-auto p-6 pt-24">
      <Background />
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">User Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-black/50 backdrop-blur-md border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white flex items-center">
              {/* <UserAvatar user={user} /> */}
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-200"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500 mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-200"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500 mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="bio"
                  className="text-sm font-medium text-gray-200"
                >
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500 mt-1"
                  rows={4}
                />
              </div>
              <div>
                <Label
                  htmlFor="avatar"
                  className="text-sm font-medium text-gray-200"
                >
                  Avatar URL
                </Label>
                <Input
                  id="avatar"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500 mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 backdrop-blur-md border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="notifications"
                  className="text-sm font-medium text-gray-200"
                >
                  Enable Notifications
                </Label>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div>
                <Label
                  htmlFor="timer-sensitivity"
                  className="text-sm font-medium text-gray-200"
                >
                  Timer Sensitivity
                </Label>
                <Slider
                  id="timer-sensitivity"
                  min={0}
                  max={100}
                  step={1}
                  value={[timerSensitivity]}
                  onValueChange={(value) => setTimerSensitivity(value[0])}
                  className="bg-gray-800 mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="cube-type"
                  className="text-sm font-medium text-gray-200"
                >
                  Default Cube Type
                </Label>
                <Select value={cubeType} onValueChange={setCubeType}>
                  <SelectTrigger
                    id="cube-type"
                    className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500 mt-1"
                  >
                    <SelectValue placeholder="Select cube type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white border-gray-700">
                    <SelectItem value="2x2">2x2</SelectItem>
                    <SelectItem value="3x3">3x3</SelectItem>
                    <SelectItem value="4x4">4x4</SelectItem>
                    <SelectItem value="5x5">5x5</SelectItem>
                    <SelectItem value="pyraminx">Pyraminx</SelectItem>
                    <SelectItem value="megaminx">Megaminx</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="language"
                  className="text-sm font-medium text-gray-200"
                >
                  Language
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger
                    id="language"
                    className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500 mt-1"
                  >
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white border-gray-700">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator className="my-4" />
              <div>
                <Label
                  htmlFor="theme"
                  className="text-sm font-medium text-gray-200"
                >
                  Theme
                </Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger
                    id="theme"
                    className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 focus:ring-blue-500 mt-1"
                  >
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white border-gray-700">
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="sound-effects"
                  className="text-sm font-medium text-gray-200"
                >
                  Sound Effects
                </Label>
                <Switch
                  id="sound-effects"
                  checked={soundEffects}
                  onCheckedChange={setSoundEffects}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 backdrop-blur-md border-gray-800 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-profile"
                    checked={privacySettings.showProfile}
                    onCheckedChange={(checked) =>
                      setPrivacySettings((prev) => ({
                        ...prev,
                        showProfile: checked === true,
                      }))
                    }
                  />
                  <Label
                    htmlFor="show-profile"
                    className="text-sm font-medium text-gray-200"
                  >
                    Show profile to other users
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-stats"
                    checked={privacySettings.showStats}
                    onCheckedChange={(checked) =>
                      setPrivacySettings((prev) => ({
                        ...prev,
                        showStats: checked === true,
                      }))
                    }
                  />
                  <Label
                    htmlFor="show-stats"
                    className="text-sm font-medium text-gray-200"
                  >
                    Show solving statistics publicly
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-activity"
                    checked={privacySettings.showActivity}
                    onCheckedChange={(checked) =>
                      setPrivacySettings((prev) => ({
                        ...prev,
                        showActivity: checked === true,
                      }))
                    }
                  />
                  <Label
                    htmlFor="show-activity"
                    className="text-sm font-medium text-gray-200"
                  >
                    Show recent activity on profile
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="subscribe-newsletter"
                    checked={subscribeNewsletter}
                    onCheckedChange={(checked) =>
                      setSubscribeNewsletter(checked === true)
                    }
                  />
                  <Label
                    htmlFor="subscribe-newsletter"
                    className="text-sm font-medium text-gray-200"
                  >
                    Subscribe to our newsletter
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <Badge variant="secondary" className="text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </Badge>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
