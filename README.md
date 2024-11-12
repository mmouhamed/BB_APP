1. Install NextAuth.js
First, make sure you have NextAuth installed:

```bash
npm install next-auth

rm -rf node_modules
rm package-lock.json
npm install

npm install pg
```

2. Create the API Route for Authentication
NextAuth.js requires an API route to handle authentication. Create a new file at pages/api/auth/[...nextauth].js (or in app/api/auth/[...nextauth]/route.js if using the app directory).


3. Update Your ExecuteQuery Function
Make sure your ExecuteQuery function can handle parameterized queries to prevent SQL injection. Here’s how you could modify it:


4. Create the Login Page
You can now create a login form that uses NextAuth.js for authentication. Here's an example of what your login component might look like:

5. Protect Your Routes
To protect pages that require authentication, you can use the useSession hook from NextAuth.js: