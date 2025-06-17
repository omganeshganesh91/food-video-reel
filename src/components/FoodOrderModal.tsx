
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface FoodOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFood: string;
}

const FoodOrderModal = ({ open, onOpenChange, selectedFood }: FoodOrderModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    quantity: 1,
    time: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReserveNow = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !selectedDate || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Reservation Confirmed!",
      description: `Your order for ${selectedFood} has been reserved for ${format(selectedDate, "PPP")} at ${formData.time}.`,
    });

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      quantity: 1,
      time: "",
    });
    setSelectedDate(undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-50 to-pink-50">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-800 mb-2">
            MAKE A RESERVATION
          </DialogTitle>
          <p className="text-center text-gray-600 mb-4">
            For Further Questions, Please Call
          </p>
          <p className="text-center text-lg font-semibold text-purple-700 mb-6">
            Ordering: {selectedFood}
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* First Name and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="border-b-2 border-gray-300 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:border-purple-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="border-b-2 border-gray-300 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:border-purple-500"
                required
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-700">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-b-2 border-gray-300 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-gray-700">Time</Label>
              <div className="relative">
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  className="border-b-2 border-gray-300 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:border-purple-500"
                  required
                />
                <Clock className="absolute right-2 top-2 h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Email and Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="border-b-2 border-gray-300 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:border-purple-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-gray-700">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", parseInt(e.target.value) || 1)}
                className="border-b-2 border-gray-300 border-t-0 border-l-0 border-r-0 rounded-none bg-transparent focus:border-purple-500"
                required
              />
            </div>
          </div>

          {/* Reserve Now Button */}
          <div className="flex justify-center pt-6">
            <Button
              onClick={handleReserveNow}
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-full font-semibold"
            >
              RESERVE NOW →
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FoodOrderModal;
