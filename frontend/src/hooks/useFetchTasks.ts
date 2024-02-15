import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { notify } from "../components/notification";

export const useFetchTasks = (page: number, limit: number) => {
    const { data, isLoading } = useQuery({
        queryKey: ['fetch-tasks', page],
        queryFn: async () => await axios.get('tasks', {params: {page, limit}}),
        onError:  () => {
           notify('error', "Error", "Unable to fetch tasks")
        }
    })
    return {
        data: data?.data?.data,
        meta: data?.data?.meta,
        isLoading
    }
}