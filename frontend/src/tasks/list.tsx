import { ReactElement, useEffect, useState } from "react";
import { Badge, BadgeProps, Button, Row, Space, Table, TableProps, Typography } from "antd";
import { useFetchTasks } from "../hooks/useFetchTasks";
import { AddTaskForm } from "./addTaskForm";
import { useTaskDelete, useTaskUpdate } from "../hooks/useTaskMutation";

interface DataType {
    id: string;
    key: string;
    name: string;
    status: string;
}
export interface TaskData extends Omit<DataType, 'key'>{}

interface StatusType {
    todo: string;
    completed: string;
}
interface ColProps {
    handleUpdate: (id: string) => void;
    handleDelete: (id: string) => void;
}

const taskStatus: StatusType = {
    "todo": "default",
    "completed": "success"
}


const useColumns = ({handleUpdate, handleDelete}: ColProps):  TableProps<DataType>['columns'] => {
    return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: "name",
            render: (text) => <Typography.Text className="initial_capital">{text}</Typography.Text>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: "status",
            render: (text) => (
            <Space>
                 <Badge status={taskStatus[text as keyof StatusType] as BadgeProps["status"]} />
                <Typography.Text className="initial_capital">{text}</Typography.Text>
            </Space>
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: "action",
            render: (_, {id, status}: TaskData): ReactElement => {
                return (
                    <Space>
                        <Button type="primary" disabled={status==='completed'} onClick={() => handleUpdate(id)}>Completed</Button>
                        <Button type="default" onClick={() => handleDelete(id)}>Delete</Button>
                    </Space>
                )
            }
        }
    ]
    
}


const TasksList = () => {
    const limit = 7;

    const [page, setPage] = useState(1);
    
    const { data, meta, isLoading } = useFetchTasks(page, limit);
    const updateTask = useTaskUpdate();
    const deleteTask = useTaskDelete();

    const resetPage = () => setPage(1);

    const handlePageChange = (value: number) => {
        setPage(value);
    }

    const handleDelete = (id: string) => {
        deleteTask.mutate(id);
    }

    const handleUpdate = (id : string) => {
        const data = {
            id,
            status: 'completed'
        }
        updateTask.mutate(data);
    }

    const columns = useColumns({handleDelete, handleUpdate});

    useEffect(() => {
        resetPage();
    }, [])

    return (
        <>
            <Row align="middle" justify="center" className="margin-top-2">
                <AddTaskForm />
            </Row>
            <Row className="margin-top-2">
                <Typography.Title level={3}>Tasks</Typography.Title>
            </Row>
            <Table 
            columns={columns} 
            className="table-bg-color"
            dataSource={data} 
            loading={isLoading} 
            pagination={{
                current: meta?.curentPage,
                defaultPageSize: meta?.itemsPerPage,
                pageSize: meta?.itemsPerPage,
                hideOnSinglePage: meta?.totalItems <= meta?.itemsPerPage,
                total: meta?.totalItems,
                showSizeChanger: false,
                pageSizeOptions: ['10', '25', '50', '100'],
                onChange: handlePageChange
            }}
            />
        </>
    );
}

export { TasksList };