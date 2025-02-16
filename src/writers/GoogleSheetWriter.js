import { google } from "googleapis";
import config from "../config.js";
import path from "path";

export default class GoogleSheetWriter {
  constructor() {
    this.spreadsheetId = config.spreadsheetId;
    this.sheetName = config.sheetName;
    this.auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(process.cwd(), config.credentialsPath),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    this.sheetRange = config.sheetRange;
  }

  async initialize() {
    const authClient = await this.auth.getClient();
    this.sheets = google.sheets({ version: "v4", auth: authClient });
  }

  async write(data) {
    if (!this.sheets) {
      await this.initialize();
    }

    try {
      const values = [[...Object.values(data)]];
      console.log("==> write to sheet");
      console.log(values);
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: this.sheetRange,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        resource: {
          values,
        },
      });
    } catch (error) {
      console.error("Error writing to Google Sheets:", error);
    }
  }
}
