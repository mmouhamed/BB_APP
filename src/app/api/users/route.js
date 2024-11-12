import ExecuteQuery from "@/app/db/dbconfig";

export async function GET(request) {
    try {
        const query = 'SELECT TOP 5 * FROM BB_Users';
        const users = await ExecuteQuery(query);

        const data = JSON.stringify(users);
        console.log(data)

        return new Response(data, {
            status: 200,
            headers: {
                'Content-Type': 'application/json', // Set the content type
            },
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}