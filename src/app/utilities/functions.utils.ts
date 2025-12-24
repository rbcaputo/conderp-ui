// Record inverter.
export function invertRecord<Label extends string, Value extends string | number>(record: Record<Label, Value>): Record<Value, Label> {
  const invertedRecord: Record<Value, Label> = { } as Record<Value, Label>;

  for (const [label, value] of Object.entries(record) as [Label, Value][])
    invertedRecord[value] = label;

  return invertedRecord;
}
