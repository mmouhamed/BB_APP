// app/api/workorders/route.js
import ExecuteQuery from "@/app/db/pgDBconfig"; // Adjust the path as necessary

export async function GET(request) {
  try {
    // const openCount = await ExecuteQuery("SELECT COUNT(*) AS count FROM BB_WO WHERE WO_STATUS = 'Open'");
    // const assignedCount = await ExecuteQuery("SELECT COUNT(*) AS count FROM BB_WO WHERE WO_STATUS = 'Assigned'");
    // const closedCount = await ExecuteQuery("SELECT COUNT(*) AS count FROM BB_WO WHERE WO_STATUS = 'Closed'");
    const openQuery =
      'SELECT COUNT(*) AS count FROM "bb_wo" WHERE "WO_STATUS" = $1';
    const assignedQuery =
      'SELECT COUNT(*) AS count FROM "bb_wo" WHERE "WO_STATUS" = $1';
    const closedQuery =
      'SELECT COUNT(*) AS count FROM "bb_wo" WHERE "WO_STATUS" = $1';

    const openCount = await ExecuteQuery(openQuery, ["Open"]);
    const assignedCount = await ExecuteQuery(assignedQuery, ["Assigned"]);
    const closedCount = await ExecuteQuery(closedQuery, ["Closed"]);

    return new Response(
      JSON.stringify({
        open: openCount[0]?.count || 0, // Safely handle undefined or null
        assigned: assignedCount[0]?.count || 0,
        closed: closedCount[0]?.count || 0,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching work order counts:", error);
    return new Response("Error fetching work order counts", { status: 500 });
  }
}
