import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  User,
  Users,
  Shield,
  CreditCard,
  Bell,
  Mail,
  Smartphone,
  Globe,
  Database,
  Printer,
  Save,
} from "lucide-react";

interface SettingsModuleProps {}

const SettingsModule: React.FC<SettingsModuleProps> = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="w-full h-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="w-full p-4 border-b border-border flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold">System Settings</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-0">
                <Tabs
                  orientation="vertical"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="flex flex-col h-auto items-stretch justify-start p-0 bg-transparent">
                    <TabsTrigger
                      value="general"
                      className="justify-start px-4 py-3 data-[state=active]:bg-muted"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      General
                    </TabsTrigger>
                    <TabsTrigger
                      value="profile"
                      className="justify-start px-4 py-3 data-[state=active]:bg-muted"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger
                      value="users"
                      className="justify-start px-4 py-3 data-[state=active]:bg-muted"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Users & Permissions
                    </TabsTrigger>
                    <TabsTrigger
                      value="security"
                      className="justify-start px-4 py-3 data-[state=active]:bg-muted"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Security
                    </TabsTrigger>
                    <TabsTrigger
                      value="billing"
                      className="justify-start px-4 py-3 data-[state=active]:bg-muted"
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Billing
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="justify-start px-4 py-3 data-[state=active]:bg-muted"
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="integrations"
                      className="justify-start px-4 py-3 data-[state=active]:bg-muted"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      Integrations
                    </TabsTrigger>
                    <TabsTrigger
                      value="database"
                      className="justify-start px-4 py-3 data-[state=active]:bg-muted"
                    >
                      <Database className="h-4 w-4 mr-2" />
                      Database
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <TabsContent value="general" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Configure general system settings and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Business Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="business-name">Business Name</Label>
                        <Input
                          id="business-name"
                          defaultValue="Inventory Management System"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="business-email">Business Email</Label>
                        <Input
                          id="business-email"
                          defaultValue="contact@example.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="business-phone">Business Phone</Label>
                        <Input
                          id="business-phone"
                          defaultValue="(555) 123-4567"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="business-address">
                          Business Address
                        </Label>
                        <Input
                          id="business-address"
                          defaultValue="123 Business St, City, State 12345"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Regional Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select defaultValue="america-new_york">
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="america-new_york">
                              America/New York
                            </SelectItem>
                            <SelectItem value="america-los_angeles">
                              America/Los Angeles
                            </SelectItem>
                            <SelectItem value="europe-london">
                              Europe/London
                            </SelectItem>
                            <SelectItem value="asia-tokyo">
                              Asia/Tokyo
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Select defaultValue="usd">
                          <SelectTrigger id="currency">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usd">USD ($)</SelectItem>
                            <SelectItem value="eur">EUR (€)</SelectItem>
                            <SelectItem value="gbp">GBP (£)</SelectItem>
                            <SelectItem value="jpy">JPY (¥)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date-format">Date Format</Label>
                        <Select defaultValue="mm-dd-yyyy">
                          <SelectTrigger id="date-format">
                            <SelectValue placeholder="Select date format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mm-dd-yyyy">
                              MM/DD/YYYY
                            </SelectItem>
                            <SelectItem value="dd-mm-yyyy">
                              DD/MM/YYYY
                            </SelectItem>
                            <SelectItem value="yyyy-mm-dd">
                              YYYY/MM/DD
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">System Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="dark-mode">Dark Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Use dark theme throughout the application
                          </p>
                        </div>
                        <Switch id="dark-mode" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notifications">
                            Email Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive email notifications for important events
                          </p>
                        </div>
                        <Switch id="notifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-logout">Auto Logout</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically log out after period of inactivity
                          </p>
                        </div>
                        <Switch id="auto-logout" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>
                    Manage your personal profile information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Profile settings content would go here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Users & Permissions</CardTitle>
                  <CardDescription>
                    Manage users and their access permissions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Users and permissions content would go here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Configure security settings and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Security settings content would go here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                  <CardDescription>
                    Manage your billing information and subscription plan.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Billing information content would go here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how and when you receive notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Notification settings content would go here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>
                    Connect with third-party services and applications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Integrations content would go here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="database" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Database Settings</CardTitle>
                  <CardDescription>
                    Configure database connections and settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Database settings content would go here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModule;
