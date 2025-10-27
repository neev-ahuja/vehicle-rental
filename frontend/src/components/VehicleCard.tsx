import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Gauge, MapPin } from 'lucide-react';
import { Vehicle } from '@/lib/api';
import { Link } from 'react-router-dom';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const isRented = vehicle.userid !== -1;

  return (
    <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300 animate-fade-in">
      <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
        <div className="text-6xl">🚗</div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground capitalize">{vehicle.name}</h3>
            <Badge variant="secondary" className="mt-2 capitalize">
              {vehicle.type}
            </Badge>
          </div>
          {isRented && (
            <Badge variant="destructive">Rented</Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {vehicle.description}
        </p>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="capitalize">{vehicle.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-primary" />
            <span>{vehicle.distance.toLocaleString()} km</span>
          </div>
        </div>

        <Link to={`/vehicles/${vehicle.id}`}>
          <Button 
            className="w-full bg-gradient-primary hover:opacity-90"
            disabled={isRented}
          >
            {isRented ? 'Not Available' : 'View Details'}
          </Button>
        </Link>
      </div>
    </Card>
  );
};
