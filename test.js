import GoogleSheetWriter from "./src/writers/GoogleSheetWriter";

const writer = new GoogleSheetWriter();

writer.write({
  name: "John Doe",
  age: 30,
});
