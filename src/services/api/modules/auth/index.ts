import { ILoginDTO } from "@/interfaces/auth/auth.dto";
import api from "../../client";

export const authLogin = async (data: ILoginDTO) => {
  return api.post("/login", { user: data });
};

export const authLogout = async () => {
  return api.post("/logout");
};
