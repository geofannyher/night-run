import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LogOut, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  // Mock data for registered users
  const registrations = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+628123456789",
      city: "Jakarta",
      category: "5k",
      registeredAt: "2025-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@email.com", 
      phone: "+628987654321",
      city: "Surabaya",
      category: "10k",
      registeredAt: "2025-01-14"
    },
    {
      id: 3,
      name: "Ahmad Rahman",
      email: "ahmad.rahman@email.com",
      phone: "+628111222333",
      city: "Bandung",
      category: "5k",
      registeredAt: "2025-01-13"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+628444555666",
      city: "Yogyakarta",
      category: "10k", 
      registeredAt: "2025-01-12"
    },
    {
      id: 5,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+628777888999",
      city: "Medan",
      category: "5k",
      registeredAt: "2025-01-11"
    }
  ];

  const stats = {
    total: registrations.length,
    fiveK: registrations.filter(r => r.category === "5k").length,
    tenK: registrations.filter(r => r.category === "10k").length
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-black">
              ADMIN <span className="text-vibrant-blue">DASHBOARD</span>
            </h1>
            <Link to="/">
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-vibrant-blue" />
                <span className="text-3xl font-bold">{stats.total}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">5K Runners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-green-500" />
                <span className="text-3xl font-bold">{stats.fiveK}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">10K Runners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-orange-500" />
                <span className="text-3xl font-bold">{stats.tenK}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registrations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Event Registrations</CardTitle>
            <CardDescription>
              List of all participants registered for the running event
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Registered Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">{registration.name}</TableCell>
                    <TableCell>{registration.email}</TableCell>
                    <TableCell>{registration.phone}</TableCell>
                    <TableCell>{registration.city}</TableCell>
                    <TableCell>
                      <Badge variant={registration.category === "5k" ? "default" : "secondary"}>
                        {registration.category.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{registration.registeredAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;