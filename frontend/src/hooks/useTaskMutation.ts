import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { notify } from '../components';

export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: {name: string, status: string;}) => await axios.post(`tasks/`, data),
        onSuccess: async () => {
            notify('success', 'Added', 'New task added.');
        },
        onError: () => {
            notify('error', 'Error', 'Task already exists in todo.'); 
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['fetch-tasks'] });
        },
    });
};

export const useTaskUpdate = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: {id: string; status: string;}) => await axios.put(`tasks/${data.id}`, {status: data.status}),
        onSuccess: async () => {
            notify('success', 'Updated', 'Task completed.');
        },
        onError: async () => {
            notify('error', 'Error', 'Unable to update task.'); 
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['fetch-tasks'] });
        },
    });
};

export const useTaskDelete = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => await axios.delete(`tasks/${id}`),
        onSuccess: async () => {
            notify('success', 'Deleted', 'Task deleted successfully.');
        },
        onError: () => {
            notify('error', 'Error', 'Task was not deleted.');
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['fetch-tasks'] });
        },
    });
};