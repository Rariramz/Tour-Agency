import { randomBytes } from "node:crypto";
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";

const target = new URL("../backend/.env", import.meta.url);
const databasePassword = randomBytes(32).toString("hex");
const demoAdminPassword = randomBytes(12).toString("base64url");
const content = [
  "NODE_ENV=development",
  "PORT=5000",
  "DB_HOST=127.0.0.1",
  "DB_PORT=55432",
  "DB_USER=tour_agency",
  "DB_NAME=tour_agency",
  `DB_PASSWORD=${databasePassword}`,
  "POSTGRES_USER=tour_agency",
  "POSTGRES_DB=tour_agency",
  `POSTGRES_PASSWORD=${databasePassword}`,
  `JWT_SECRET=${randomBytes(48).toString("hex")}`,
  "DEMO_ADMIN_EMAIL=admin@tour-agency.local",
  `DEMO_ADMIN_PASSWORD=${demoAdminPassword}`,
  "",
].join("\n");

try {
  writeFileSync(target, content, { flag: "wx", mode: 0o600 });
  console.log(
    "Created backend/.env with fresh local credentials. Existing databases were not changed."
  );
  console.log(
    `Local demo admin: admin@tour-agency.local / ${demoAdminPassword}`
  );
} catch (error) {
  if (error.code === "EEXIST") {
    const existing = readFileSync(target, "utf8");
    const values = Object.fromEntries(
      existing
        .split(/\r?\n/)
        .filter((line) => line && !line.startsWith("#") && line.includes("="))
        .map((line) => {
          const separator = line.indexOf("=");
          return [line.slice(0, separator), line.slice(separator + 1)];
        })
    );
    const additions = [];
    if (!values.POSTGRES_USER && values.DB_USER)
      additions.push(`POSTGRES_USER=${values.DB_USER}`);
    if (!values.POSTGRES_DB && values.DB_NAME)
      additions.push(`POSTGRES_DB=${values.DB_NAME}`);
    if (!values.POSTGRES_PASSWORD && values.DB_PASSWORD)
      additions.push(`POSTGRES_PASSWORD=${values.DB_PASSWORD}`);
    if (!values.DEMO_ADMIN_EMAIL)
      additions.push("DEMO_ADMIN_EMAIL=admin@tour-agency.local");
    if (!values.DEMO_ADMIN_PASSWORD)
      additions.push(`DEMO_ADMIN_PASSWORD=${demoAdminPassword}`);

    if (additions.length) {
      appendFileSync(
        target,
        `${existing.endsWith("\n") ? "" : "\n"}${additions.join("\n")}\n`
      );
      console.log(
        "Added missing local Compose and demo settings to backend/.env; existing values were preserved."
      );
      if (!values.DEMO_ADMIN_PASSWORD) {
        console.log(
          `Local demo admin: admin@tour-agency.local / ${demoAdminPassword}`
        );
      }
    } else {
      console.log("backend/.env already exists; preserved without changes.");
    }
  } else {
    throw error;
  }
}
