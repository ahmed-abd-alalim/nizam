import { execution_context_type } from "../../assets/type.js";

let runtimeContext: execution_context_type | null = null;

export function startProject(ctx: execution_context_type) {
  runtimeContext = ctx;
}

export function useContext(): execution_context_type {
  if (!runtimeContext) {
    throw new Error(
      "Runtime Context not initialized. Call startProject() first."
    );
  }
  return runtimeContext;
}
