export default class MappingStrategy {
  constructor(mappingTable) {
    this.mappingTable = mappingTable; // Store the mapping table
  }

  map(gift) {
    console.log("==> map gift");
    console.log(gift);
    return {
      col1: this.mappingTable[gift.value] || null,
      col2: "",
      col3: "",
      col4: JSON.stringify(gift),
    }; // Use the stored mapping table
  }
}
