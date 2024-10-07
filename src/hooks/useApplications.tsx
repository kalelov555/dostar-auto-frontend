import { IVehicleType } from "@/interfaces";
import {
  IApplicationCreateResponse,
  IApplicationDto,
  IApplicationsResponse,
} from "@/interfaces/applications";
import {
  createApplication,
  fetchMyApplications,
} from "@/services/api/modules/applications";
import { tokenStorage } from "@/store/token";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useAtom } from "jotai";
import { useAuth } from "./useAuth";

export const useGetApplications = (params: any) => {
  const auth = useAuth();
  const [token, _] = useAtom(tokenStorage);
  return useQuery<AxiosResponse<IApplicationsResponse, any>, Error>({
    retry: false,
    queryKey: ["applications"],
    enabled: auth.isSuccess,
    queryFn: async () => {
      const response = await fetchMyApplications(params, {
        Authorization: `Bearer ${token}`,
      });
      return response;
    },
  });
};

type Params = {
  vehicle_type: IVehicleType;
  id: number;
  body: IApplicationDto;
};

export const useCreateApplication = () => {
  const [token, _] = useAtom(tokenStorage);
  return useMutation<
    AxiosResponse<IApplicationCreateResponse, any>,
    Error,
    Params
  >({
    mutationKey: ["create/application"],
    mutationFn: async (params: Params) => {
      const response = await createApplication(
        params.vehicle_type,
        params.id,
        params.body,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      return response;
    },
  });
};
