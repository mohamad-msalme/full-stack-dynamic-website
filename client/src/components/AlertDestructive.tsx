import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type TAlertDestructiveProps = {
  msg: string;
};
export const AlertDestructive: React.FC<TAlertDestructiveProps> = ({ msg }) => {
  if (!msg) return null;
  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{msg}</AlertDescription>
    </Alert>
  );
};
