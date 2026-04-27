import { genDotDataSet } from "@/constants/menuItems";
import React, { useMemo, useState } from "react";
import AutocompleteField from "../auto-complete-field";

const fruits = [
  { id: "1", name: "Mango" },
  { id: "2", name: "Orange" },
  { id: "3", name: "Apple" },
];

export default function Example() {
  const [fruit, setFruit] = useState(null);
  console.log({ fruit: fruit });

  const fruitsDataSet = useMemo(() => genDotDataSet(fruits, "name"), []);

  return (
    <AutocompleteField
      label="Fruit"
      dataSet={fruitsDataSet}
      onChange={(value) => setFruit(value)}
    />
  );
}
