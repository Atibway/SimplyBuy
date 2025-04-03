import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (id: string): Promise<Billboard | null> => {
    try {
        const res = await fetch(`${URL}/${id}`);

        // Check if the response is ok (status in the range 200-299)
        if (!res.ok) {
            console.error(`Error: ${res.status} ${res.statusText}`);
            throw new Error(`Failed to fetch billboard with id: ${id}`);
        }

        // Parse and return JSON response
        return await res.json();
    } catch (error) {
        console.error("Error fetching billboard:", error);
        // Return null or handle the error appropriately
        return null;
    }
}

export default getBillboard;
