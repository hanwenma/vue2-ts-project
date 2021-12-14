import * as Axios from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    // useFormData?: boolean
  }
}
