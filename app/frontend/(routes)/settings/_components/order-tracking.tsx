"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrackingInfo } from './tracking-info';

interface TrackingStage {
  name: string;
  completed: boolean;
  date: string | null;
}

interface TrackingData {
  orderNumber: string;
  status: string;
  estimatedDelivery: string;
  stages: TrackingStage[];
}

export default function ProductTracking() {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating API call to fetch tracking data
    // In a real application, you would make an actual API call here
    setTrackingData({
      orderNumber: orderNumber,
      status: 'Shipped',
      estimatedDelivery: '2023-06-15',
      stages: [
        { name: 'Ordered', completed: true, date: '2023-06-10' },
        { name: 'Shipped', completed: true, date: '2023-06-12' },
        { name: 'Delivered', completed: false, date: null },
      ]
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Track Your Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="space-y-2">
          <Label htmlFor="order-number">Order Number</Label>
          <div className="flex space-x-2">
            <Input
              id="order-number"
              placeholder="Enter your order number"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Track</Button>
          </div>
        </div>
      </form>
      {trackingData && <TrackingInfo data={trackingData} />}
    </div>
  );
}
