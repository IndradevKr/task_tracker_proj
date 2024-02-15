import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const notify = (type: NotificationType, title: string, description: string) => {
  notification[type]({
    message: title,
    description,
    placement: 'bottomLeft',
    duration: 2,
    });
};

