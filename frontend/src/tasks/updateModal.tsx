import { Modal } from "antd";
import { TaskData } from "./list";
import { Dispatch, SetStateAction } from "react";

interface ModalProps {
    taskData: TaskData;
    setTask: Dispatch<SetStateAction<TaskData | undefined>>
}

const UpdateModal = ({taskData, setTask} : ModalProps) => {
    return (
        <Modal open={taskData ? true : false} onCancel={() => setTask(undefined)} >
            <h1>Coming Soon</h1>
        </Modal>
    )
}
export { UpdateModal };