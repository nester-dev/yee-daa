import type { MeasureUnit } from "@/entities/measure-units";

export const getMeasureUnitsOptions = (data?: MeasureUnit[]) => {
  return (
    data?.map((item) => ({
      value: item._id,
      label: item.name,
    })) || []
  );
};
