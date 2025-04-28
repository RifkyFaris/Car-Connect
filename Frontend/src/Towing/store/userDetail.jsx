import { create } from "zustand";

export const useUserDetailStore = create((set) => ({
    userDetails: [],

    setUserDetails: (userDetails) => set({ userDetails }),

    createUserDetail: async (newUserDetail) => {
        if (!newUserDetail.name ||!newUserDetail.contactNumber || !newUserDetail.vehicleModel || !newUserDetail.vehicleYear || !newUserDetail.pickupLocation || !newUserDetail.dropLocation) {
            return { success: false, message: "Please fill in all fields." };
        }

        try {
            const res = await fetch("/api/createuserdetail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUserDetail),
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

            set((state) => ({ userDetails: [...state.userDetails, data.data] }));
            return { success: true, message: "User Detail created successfully." };
        } catch (error) {
            console.error("Error creating user details:", error);
            return { success: false, message: "Failed to create user details." };
        }
    },

    fetchUserDetails: async () => {
        try {
            const res = await fetch("/api/getuserdetail");
            
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const text = await res.text();
            const data = text ? JSON.parse(text) : { data: [] };

            set({ userDetails: data.data });
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    },

}));