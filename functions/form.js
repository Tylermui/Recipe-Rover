export async function onRequest(context) {
    try {
        // Prepare the database statement
        const ps = context.env.NORTHWIND_DB.prepare(`SELECT * FROM datastore;`);
        
        // Execute the statement
        const results = await ps.all();
        
        // Convert results to JSON
        const jsonResponse = JSON.stringify(results);
        
        // Return the JSON response
        return new Response(jsonResponse, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (err) {
        // Return an error response
        const errorResponse = JSON.stringify({ error: 'Error connecting to the database' });
        return new Response(errorResponse, { status: 400, headers: { 'Content-Type': 'application/json' } });
      }
}