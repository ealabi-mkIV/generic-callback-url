
const express = require("express");

const app = express();
const PORT = 3000;

// จัดเก็บคำขอไว้ในหน่วยความจำ
const requests = [];

// ดักจับทุกคำขอที่ส่งเข้ามา
app.use((req, res, next) => {
  // ไม่บันทึกคำขอที่ส่งมายังหน้าแรก
  if (req.path !== "/") {
    requests.push({
      method: req.method,
      path: req.path,
      time: new Date().toISOString(),
      ip: req.ip,
      headers: req.headers,
      query: req.query,
      body: req.body
    });
  }

  next();
});

// หน้าแรก: แสดงคำขอทั้งหมด
app.get("/", (req, res) => {
  const grouped = {};

  for (const request of requests) {
    grouped[request.path] ??= [];
    grouped[request.path].push(request);
  }

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Request Logger</title>
      </head>

      <body>
        <h1>Request Logger</h1>
        <p>Total requests: ${requests.length}</p>

        ${Object.entries(grouped).map(([path, entries]) => `
          <div class="group">
            <h2>${escapeHtml(path)} (${entries.length})</h2>

            ${entries.map(request => `
              <pre>${escapeHtml(JSON.stringify(request, null, 2))}</pre>
            `).join("")}
          </div>
        `).join("")}
      </body>
    </html>
  `);
});

// แปลงอักขระ HTML เพื่อป้องกันข้อมูลที่บันทึกไว้แทรกโค้ด HTML
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

// อนุญาตให้รับคำขอจากทุกเส้นทาง (Path)
app.use((req, res) => {
  res.status(200).send("Request logged.");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
