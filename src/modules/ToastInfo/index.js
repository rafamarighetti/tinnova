import ToastServive from 'react-material-toast';

const toast = ToastServive.new({
  place:'bottomRight',
  duration:2,
  maxCount:8
});

export const ToastInfo = (message) => {
  return toast.info(message)
}

export const ToastError = (message) => {
  return toast.error(message)
}

export const ToastSuccess = (message) => {
  return toast.success(message)
}

export const ToastWarning = (message) => {
  return toast.warning(message)
}

export const RemoveAllToasts = () => {
  toast.removeAll();
}