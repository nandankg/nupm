import { toast } from "react-toastify";

// Utility function to show a toast once
export const showToastOnce = (message, type = "success") => {

  
  if (!window._toastShown) {
    if (type === "error") {
      toast.error(message);
    } else {
      toast({message, toastId: 'success1',});
    }
    window._toastShown = true;

    // Reset the flag after a delay (e.g., 3 seconds)
    setTimeout(() => {
      window._toastShown = false;
    }, 3000);
  }
};
