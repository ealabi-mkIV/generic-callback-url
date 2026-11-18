## Installation

Clone the repository:

```bash
git clone <repository-url>
cd request-logger
```

Install dependencies:

```bash
npm install
```

## Usage

Start the server:

```bash
node server.js
```

Open the dashboard:

```text
http://localhost:3000
```

The server will capture incoming requests and display them on the homepage.

## How It Works

1. Express receives an incoming HTTP request.
2. Middleware intercepts the request before it reaches the route handler.
3. Request information is stored in an in-memory array.
4. The homepage groups recorded requests by their URL path.
5. All captured requests are rendered as formatted JSON.

Requests to `/` are excluded from logging to prevent the dashboard itself from generating unnecessary entries.
