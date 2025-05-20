
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "@/components/ui/use-toast";

export default function ProfilePage() {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  
  const [fullName, setFullName] = useState(userProfile?.fullName || "");
  const [phoneNumber, setPhoneNumber] = useState(userProfile?.phoneNumber || "");
  const [isLoading, setIsLoading] = useState(false);

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !phoneNumber) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Update profile in Firestore
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        fullName,
        phoneNumber,
      });
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={currentUser.email || ""} 
                  disabled 
                />
                <p className="text-sm text-gray-500">
                  Your email cannot be changed
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input 
                  id="phoneNumber" 
                  type="tel" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)} 
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
