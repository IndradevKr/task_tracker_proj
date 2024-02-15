import { Button, Space } from "antd";
import React, { useEffect, useRef } from "react";
import { useAddTask } from "../hooks/useTaskMutation";

const AddTaskForm = () => {
    const nameInputRef = useRef<HTMLInputElement | null>(null);

    const addTask  = useAddTask();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = nameInputRef.current!.value;
        const data = {
            name,
            status: "todo",
        }
        addTask.mutate(data);
        nameInputRef.current!.value = '';
    }
    
    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
      }, []);

    return (
        <form onSubmit={handleSubmit}>
            <Space>
                <input className="name-input" type="text" placeholder="Enter Task Name" ref={nameInputRef} />
                <Button type="primary" htmlType="submit">Add</Button>
            </Space>
        </form>
    )
}

export { AddTaskForm };