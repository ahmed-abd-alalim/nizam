import { useContext } from "../../../core/context/runtime.js";

export async function Bootstrap() {
  const { user_options } = useContext();

  try {
    // add import 'bootstrap/dist/css/bootstrap.min.css'; in main.tsx or jsx
    // add import 'bootstrap/dist/js/bootstrap.bundle.min.js'; in main.tsx or jsx
    // edit index.css
  } catch (err: any) {
    throw err;
  }
}
