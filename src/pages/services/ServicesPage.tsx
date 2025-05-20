
import { useState } from "react";
import { useServices } from "@/hooks/useServices";
import ServiceCard from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ServicesPage() {
  const { services, loading, error, getServicesByCategory } = useServices();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Services" },
    { id: "haircuts", name: "Haircuts" },
    { id: "beard", name: "Beard" },
    { id: "shave", name: "Shaves" },
    { id: "color", name: "Hair Color" },
    { id: "facial", name: "Facials" },
    { id: "package", name: "Packages" }
  ];

  const filteredServices = getServicesByCategory(activeCategory);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="h-80 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience premium grooming services tailored for the modern gentleman. 
          Our skilled barbers and stylists are dedicated to providing you with exceptional care.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full mb-10">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full h-auto">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="py-3"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
