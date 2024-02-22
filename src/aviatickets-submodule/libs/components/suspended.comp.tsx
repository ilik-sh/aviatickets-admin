import { CircularProgress } from "@mui/material";
import { FC, PropsWithChildren, Suspense } from "react";

export const Suspended: FC<PropsWithChildren & { element: any }> = ({
  element: Element,
}) => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Element />
    </Suspense>
  );
};
