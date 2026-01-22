import { execution_context_type } from "../../assets/type.js";

let runtimeContext: execution_context_type | null = null;
let reset_data: execution_context_type | null = null;

export function startProject(ctx: execution_context_type) {
  runtimeContext = ctx;
  reset_data = structuredClone(ctx);
}

export function useContext(): execution_context_type {
  if (!runtimeContext) {
    throw new Error(
      "Runtime Context not initialized. Call startProject() first.",
    );
  }
  return runtimeContext;
}

export async function resetContext() {
  if (!reset_data) return;
  runtimeContext!.user_options = reset_data.user_options;
}
