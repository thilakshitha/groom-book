
import { Service } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <img 
          src={service.imageUrl} 
          alt={service.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{service.name}</CardTitle>
        <CardDescription className="line-clamp-2">{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{service.duration} mins</span>
          </div>
          <div className="flex items-center">
            <DollarSign size={16} className="mr-1" />
            <span>${service.price.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900"
          onClick={() => navigate(`/booking/${service.id}`)}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}
