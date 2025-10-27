import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { vehicleApi, Vehicle } from '@/lib/api';
import { authStorage } from '@/lib/auth';
import { Calendar, Gauge, MapPin, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [renting, setRenting] = useState(false);
  const { toast } = useToast();
  const user = authStorage.getUser();

  useEffect(() => {
    if (id) {
      loadVehicle();
    }
  }, [id]);

  const loadVehicle = async () => {
    try {
      const data = await vehicleApi.getById(Number(id));
      setVehicle(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load vehicle details.',
        variant: 'destructive',
      });
      navigate('/vehicles');
    } finally {
      setLoading(false);
    }
  };

  const handleRent = async () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please login to rent a vehicle.',
      });
      navigate('/login');
      return;
    }

    if (!vehicle) return;

    setRenting(true);
    try {
      await vehicleApi.rent(vehicle.id, user.id);
      toast({
        title: 'Success!',
        description: 'Vehicle rented successfully.',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to rent vehicle. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setRenting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!vehicle) return null;

  const isRented = vehicle.userid !== -1;
  const isRentedByUser = user && vehicle.userid === user.id;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/vehicles')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Vehicles
        </Button>

        <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
          {/* Image */}
          <Card className="overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <div className="text-9xl">🚗</div>
            </div>
          </Card>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-4xl font-bold text-foreground capitalize">{vehicle.name}</h1>
                {isRented && (
                  <Badge variant={isRentedByUser ? 'default' : 'destructive'}>
                    {isRentedByUser ? 'Your Rental' : 'Rented'}
                  </Badge>
                )}
              </div>
              <Badge variant="secondary" className="text-lg capitalize px-4 py-1">
                {vehicle.type}
              </Badge>
            </div>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Vehicle Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground font-medium capitalize">{vehicle.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="text-foreground font-medium">{vehicle.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Distance Covered</p>
                    <p className="text-foreground font-medium">{vehicle.distance.toLocaleString()} km</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{vehicle.description}</p>
            </Card>

            {!isRentedByUser && (
              <Button
                onClick={handleRent}
                disabled={isRented || renting}
                className="w-full bg-gradient-accent hover:opacity-90 text-lg py-6"
              >
                {renting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : isRented ? (
                  'Not Available'
                ) : (
                  'Rent This Vehicle'
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
