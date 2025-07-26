const fs = require("fs");
const path = require("path");

const requiredFiles = [
  "src/App.jsx",
  "src/main.jsx",
  "src/pages/TestAPI.jsx",
  "src/pages/LoginPage.jsx",
  "src/pages/admin/FounderDashboard.jsx",
  "src/layouts/MasterLayout.jsx",
  "src/components/Topbar.jsx",
  ".env"
];

console.log("🔍 Verifying required project files...\n");

let allExist = true;

requiredFiles.forEach((file) => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ Found: ${file}`);
  } else {
    console.log(`❌ Missing: ${file}`);
    allExist = false;
  }
});

if (allExist) {
  console.log("\n🎉 All required files are present!");
} else {
  console.log("\n⚠️ Some files are missing. Please check the list above.");
}
