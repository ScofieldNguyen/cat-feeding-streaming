import MappingStrategy from "../MappingStrategy";

const gift = {
  id: "gift123",
  userId: "user456",
  value: 100,
  name: "Gift Name",
  created: new Date().toISOString(),
  amount: 100,
  sender: "John Doe",
};
test("MappingStrategy should accept a mapping table and map gift values", () => {
  const mappingTable = {
    10: 1,
    20: 2,
    30: 3,
  };

  const strategy = new MappingStrategy(mappingTable);

  const gift1 = { ...gift, value: 10 };
  const gift2 = { ...gift, value: 20 };
  const gift3 = { ...gift, value: 30 };
  const gift4 = { ...gift, value: 40 }; // Not in mapping table

  expect(strategy.map(gift1)).toEqual({
    col1: 1,
    col2: "",
    col3: "",
    col4: JSON.stringify(gift1),
  });
  expect(strategy.map(gift2)).toEqual({
    col1: 2,
    col2: "",
    col3: "",
    col4: JSON.stringify(gift2),
  });
  expect(strategy.map(gift3)).toEqual({
    col1: 3,
    col2: "",
    col3: "",
    col4: JSON.stringify(gift3),
  });
  expect(strategy.map(gift4)).toEqual({
    col1: null,
    col2: "",
    col3: "",
    col4: JSON.stringify(gift4),
  }); // Should return null for unmapped value
});
