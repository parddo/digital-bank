import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const axiosRequest = axios.create({
  baseURL: "https://www.parddo.com",
});

const usersKey = {
    all: ["users"] as const,
    list: () => [...usersKey.all, "users"] as const,
    getUsersInfinite: () =>
      [...usersKey.list(), "get-users-infinite"] as const,
  };


  export type UserAttr = {
    name: string;
    date: Date
    gender: string;
  };
  
  export type ExtendedUserAttr = UserAttr & {
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    _id: string;
  };



  
  type ResponseUserPost = {
    status: number;
    success: boolean;
    error?: "string";
    data: UserAttr;
  };

  
  
  const useCreateUser = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseUserPost, unknown, UserAttr>(
      async (data: UserAttr) => {
        const response = await axiosRequest.post<ResponseUserPost>(
          `/api/users`,
          data
        );
  
        return response.data;
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(usersKey.all);
        },
      }
    );
  };

  type ResponseUserGet = {
    status: number;
    success: boolean;
    error?: "string";
    data: Array<ExtendedUserAttr> ;
  };


  const useGetAllUsers = () => {
    return useQuery<ResponseUserGet>(
      usersKey.all,
      async () => {
        const response = await axiosRequest.get<ResponseUserGet>(
          "api/users"
        );
        return response.data;
      },
    );
  };

  type ResponseUserPut = {
    status: number;
    success: boolean;
    error?: "string";
    data: ExtendedUserAttr;
  };

  const useUpdateUser = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation<ResponseUserPut, unknown, UserAttr>(
        async (data: UserAttr) => {
          const response = await axiosRequest.put<ResponseUserPut>(
            `/api/users/${id}`,
            data
          );
    
          return response.data;
        },
        {
            onSuccess: () => {
              queryClient.invalidateQueries(usersKey.all);
            },
          }
      );
  };

  type ResponseUserDelete = {
    status: number;
    success: boolean;
    error?: "string";
  };


  const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation<ResponseUserDelete, unknown, string>(
      async (id: string) => {
        const response = await axiosRequest.delete(`/api/users/${id}`);

        return response.data
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(usersKey.all);
        },
      }
    );
  };
  
  export { useCreateUser, useUpdateUser, useDeleteUser, useGetAllUsers};
