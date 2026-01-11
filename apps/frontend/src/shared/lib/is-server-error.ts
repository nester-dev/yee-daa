export const isServerError = (error: unknown) => {
  return (
    error !== null &&
    typeof error === "object" &&
    "status" in error &&
    String(error.status).startsWith("5")
  );
};
