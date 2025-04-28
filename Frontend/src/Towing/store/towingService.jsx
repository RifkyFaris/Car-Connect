import { create } from "zustand";

export const useTowingServiceStore = create((set) => ({
    towingServices: [],

    setTowingServices: (towingServices) => set({ towingServices }),

    createTowingService: async (newTowingService) => {
        if (!newTowingService.name || !newTowingService.price || !newTowingService.description) {
            return { success: false, message: "Please fill in all fields." };
        }

        try {
            const res = await fetch("/api/createtowing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newTowingService),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error: ${res.status} - ${errorText}`);
            }

            const text = await res.text();
            const data = text ? JSON.parse(text) : { success: false, message: "Invalid response" };

            if (!data.success) {
                return { success: false, message: data.message || "Server error" };
            }

            set((state) => ({ towingServices: [...state.towingServices, data.data] }));
            return { success: true, message: "Towing Service created successfully." };
        } catch (error) {
            console.error("Error creating towing service:", error);
            return { success: false, message: "Failed to create towing service." };
        }
    },

    fetchTowingServices: async () => {
        try {
            const res = await fetch("/api/gettowing");
            
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const text = await res.text();
            const data = text ? JSON.parse(text) : { data: [] };

            set({ towingServices: data.data });
        } catch (error) {
            console.error("Error fetching towing services:", error);
        }
    },

    deleteTowingService: async (tsid) => {
        try {
            const res = await fetch(`/api/deletetowing/${tsid}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error: ${res.status} - ${errorText}`);
            }

            const text = await res.text();
            const data = text ? JSON.parse(text) : { success: false, message: "Invalid response" };

            if (!data.success) return { success: false, message: data.message };

            set((state) => ({
                towingServices: state.towingServices.filter(service => service._id !== tsid),
            }));
            
            return { success: true, message: data.message };
        } catch (error) {
            console.error("Error deleting towing service:", error);
            return { success: false, message: "Failed to delete towing service." };
        }
    },

    updateTowingService: async (tsid, updatedTowingService) => {
        try {
            const res = await fetch(`/api/updatetowing/${tsid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTowingService),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error: ${res.status} - ${errorText}`);
            }

            const text = await res.text();
            const data = text ? JSON.parse(text) : { success: false, message: "Invalid response" };

            if (!data.success) return { success: false, message: data.message };

            set((state) => ({
                towingServices: state.towingServices.map(service =>
                    service._id === tsid ? data.data : service
                ),
            }));

            return { success: true, message: data.message };
        } catch (error) {
            console.error("Error updating towing service:", error);
            return { success: false, message: "Failed to update towing service." };
        }
    },
}));