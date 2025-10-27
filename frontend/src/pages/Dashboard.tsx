import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { vehicleApi, Vehicle } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { User, Calendar, Gauge, MapPin, Loader2 } from 'lucide-react';
import { useAuth } from '@/provider/authProvider';
const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const auth = useAuth();
  const {user} = auth; 
  const [rentedVehicles, setRentedVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<number | null>(null);

  useEffect(() => {
  if (auth.loading) return; 

  if (!user) {
    setLoading(false); 
    navigate('/login');
    return;
  }

  loadRentedVehicles();
}, [auth.loading, user, navigate]);


  const loadRentedVehicles = async () => {
    if (!user) return;
    
    try {
      const userVehicles =await vehicleApi.myVehicles();
      setRentedVehicles(userVehicles);
      console.log(userVehicles);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Failed to load your rentals.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (vehicleId: number) => {
    if (!user) return;
    
    setReturningId(vehicleId);
    try {
      await vehicleApi.unrent(vehicleId, user.id);
      toast({
        title: 'Success!',
        description: 'Vehicle returned successfully.',
      });
      loadRentedVehicles();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to return vehicle. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setReturningId(null);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* User Info */}
        <Card className="p-6 mb-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground capitalize">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </Card>

        {/* Rented Vehicles */}
        <div className="animate-slide-up">
          <h2 className="text-3xl font-bold text-foreground mb-6">Your Rentals</h2>
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : rentedVehicles.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-xl text-muted-foreground mb-6">
                You don't have any active rentals.
              </p>
              <Button onClick={() => navigate('/vehicles')} className="bg-gradient-primary hover:opacity-90">
                Browse Vehicles
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rentedVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-6xl">🚗</div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground capitalize">{vehicle.name}</h3>
                      <Badge variant="secondary" className="mt-2 capitalize">
                        {vehicle.type}
                      </Badge>
                    </div>

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

                    <Button
                      onClick={() => handleReturn(vehicle.id)}
                      disabled={returningId === vehicle.id}
                      variant="outline"
                      className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      {returningId === vehicle.id ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Returning...
                        </>
                      ) : (
                        'Return Vehicle'
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
