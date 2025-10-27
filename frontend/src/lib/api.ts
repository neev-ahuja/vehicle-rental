const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Vehicle {
  id: number;
  name: string;
  type: string;
  city: string;
  year: number;
  distance: number;
  userid: number;
  description: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  city: string;
  vehicles: number[];
  password?: string;
}

// Vehicle API
export const vehicleApi = {
  getAll: async (): Promise<Vehicle[]> => {
    const response = await fetch(`${API_URL}/vehicles`);
    if (!response.ok) throw new Error('Failed to fetch vehicles');
    return response.json();
  },

  getById: async (id: number): Promise<Vehicle> => {
    const response = await fetch(`${API_URL}/vehicles/getvehicle/${id}`);
    if (!response.ok) throw new Error('Failed to fetch vehicle');
    return response.json();
  },

  myVehicles: async (): Promise<Vehicle[]> => {
    const response = await fetch(`${API_URL}/vehicles/myvehicles`, { method: "GET", headers: { 'Content-Type': 'application/json' }, credentials: "include" });
    if (!response.ok) throw new Error('Failed to fetch vehicle');
    return response.json();
  },

  rent: async (id: number, userId: number): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/vehicles/rent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({ id, userId }),
    });
    if (!response.ok) throw new Error('Failed to rent vehicle');
    return response.json();
  },

  unrent: async (id: number, userId: number): Promise<{ message: string }> => {
    const response = await fetch(`${API_URL}/vehicles/unrent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify({ id, userId }),
    });
    if (!response.ok) throw new Error('Failed to unrent vehicle');
    return response.json();
  },
};

// User API
export const userApi = {
  register: async (name: string, email: string, password: string): Promise<User> => {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  },

  login: async (email: string, password: string): Promise<User> => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Invalid email or password');
    return response.json();
  },
};
