export function extractMainMessage(error: any): string {
  if (!error) return "Unknown error";

  if (typeof error.shortMessage === "string") {
    return error.shortMessage;
  }

  if (typeof error.stderr === "string") {
    return error.stderr.split("\n")[0];
  }

  if (error instanceof Error) {
    return error.message.split("\n")[0];
  }

  if (typeof error === "string") {
    return error;
  }

  return "Unexpected error occurred";
}
