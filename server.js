import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import { processResume, getLatestAnalysis } from "./lib/resumeProcessor.js";
import * as jobFetcher from "./lib/jobFetcher.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dataFile = path.join(process.cwd(), "data", "users.json");

// Ensure data directory and file exist
const dataDir = path.dirname(dataFile);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, JSON.stringify([]));
}

function readUsers() {
  const raw = fs.readFileSync(dataFile);
  return JSON.parse(raw);
}

function writeUsers(users) {
  fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fileId = uuidv4();
    cb(null, `${fileId}${ext}`);
  },
});
const upload = multer({ storage });

// Save user registration info
app.post("/api/login", (req, res) => {
  const { username, email, password, gender, city } = req.body;
  if (!username || !email || !password || !gender || !city) {
    return res.status(400).json({
      error: "username, email, password, gender, and city are required",
    });
  }
  const users = readUsers();
  if (users.find((u) => u.username === username)) {
    return res.status(409).json({ error: "Username already exists" });
  }
  // Assign avatar based on gender
  let avatar;
  if (gender === "male") {
    avatar = "https://randomuser.me/api/portraits/men/1.jpg";
  } else if (gender === "female") {
    avatar = "https://randomuser.me/api/portraits/women/1.jpg";
  } else {
    avatar = "https://randomuser.me/api/portraits/lego/1.jpg";
  }
  const userData = {
    username,
    email,
    password,
    gender,
    city,
    avatar,
    createdAt: new Date().toISOString(),
    resume: null,
  };
  users.push(userData);
  writeUsers(users);
  res.status(201).json({ message: "User registered" });
});

// Save resume info
app.post("/api/resume", (req, res) => {
  const { username, resume } = req.body;
  if (!username || !resume) {
    return res.status(400).json({ error: "username and resume are required" });
  }
  const users = readUsers();
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  user.resume = { ...resume, updatedAt: new Date().toISOString() };
  writeUsers(users);
  res.status(201).json({ message: "Resume info saved" });
});

// POST /upload: Receive PDF, save, and process with JavaScript
app.post("/upload", upload.single("resume"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const fileId = path.parse(req.file.filename).name;
  const filePath = path.resolve(
    path.join(__dirname, "uploads", req.file.filename)
  );

  console.log("File uploaded:", req.file.originalname);
  console.log("File saved as:", req.file.filename);
  console.log("File path:", filePath);

  try {
    // Process with JavaScript processor
    console.log("Processing with JavaScript processor...");
    const result = await processResume(fileId, filePath, req.body.user);
    console.log("Processing result:", result);

    // Return result to frontend
    return res.json({
      file_id: fileId,
      file_path: filePath,
      skills: result.skills,
      textLength: result.textLength,
    });
  } catch (err) {
    console.error("Processing error:", err.message);
    return res
      .status(500)
      .json({ error: "Processing failed", details: err.message });
  }
});

// GET /processor-status: Get latest analysis info
app.get("/processor-status", (req, res) => {
  const analysis = getLatestAnalysis();
  const html = `
    <html>
    <head>
        <title>Resume Skill Extractor</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f6f8fc; }
            .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 32px; }
            .skills { margin: 16px 0; }
            .skill { display: inline-block; background: #e0e7ff; color: #3730a3; border-radius: 16px; padding: 6px 16px; margin: 4px; font-weight: bold; }
            .btn { display: block; width: 100%; background: linear-gradient(90deg,#6366f1,#8b5cf6); color: #fff; border: none; border-radius: 8px; padding: 16px; font-size: 1.2em; margin-top: 24px; cursor: pointer; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Latest Resume Analysis (JavaScript Processor)</h2>
            <p><b>User/File:</b> ${analysis.user || "N/A"}</p>
            <div class="skills">
                <b>Extracted Skills:</b><br>
                ${
                  analysis.skills.length > 0
                    ? analysis.skills
                        .map((s) => `<span class="skill">${s}</span>`)
                        .join("")
                    : "<i>No skills extracted yet.</i>"
                }
            </div>
            <p><b>Status:</b> JavaScript processor integrated into Express server</p>
        </div>
    </body>
    </html>
  `;
  res.send(html);
});

// Health check
app.get("/", (req, res) => {
  res.send("Express server is running.");
});

// Add this after other API endpoints
app.get("/api/jobs/search", async (req, res) => {
  try {
    const jobs = await jobFetcher.query(req.query);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to fetch jobs" });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
