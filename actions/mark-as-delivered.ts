"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/prismadb";

export const delivery = async ({
    status,
    orderId
}: {
    status: boolean;
    orderId: string;
}) => {
    try {
        const user = await currentUser();

        if (!user) {
            console.error("Unauthorized: No user");
            return { error: "Unauthorized" };
        }

        if (user.role === "USER") {
            console.error("Unauthorized: User role is USER");
            return { error: "Unauthorized" };
        }

        const order = await db.order.findUnique({
            where: { id: orderId }
        });

        if (!order) {
            console.error("No Order Found");
            return { error: "No Order Found" };
        }

        await db.order.update({
            where: { id: order.id },
            data: { delivered: status }
        });

        return { success: "Delivery Updated" };

    } catch (error) {
        console.error("Error in delivery function:", error);
        return { error: "An error occurred" };
    }
};
