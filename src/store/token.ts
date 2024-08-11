import { atomWithStorage } from "jotai/utils";

export const tokenStorage = atomWithStorage("token", "", undefined, {
  getOnInit: true,
});
