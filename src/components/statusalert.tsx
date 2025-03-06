import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { Check, AlertCircle } from "lucide-react";

interface ApiStatus {
    success: boolean | null;
    message: string;
}

interface StatusAlertProps {
    apiStatus: ApiStatus;
}

const StatusAlert = ({ apiStatus }: StatusAlertProps) => {
    if (apiStatus.success === null) return null;

    return apiStatus.success ? (
        <Alert className="mt-4 bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success</AlertTitle>
            <AlertDescription className="text-green-700">
                {apiStatus.message}
            </AlertDescription>
        </Alert>
    ) : (
        <Alert className="mt-4 bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-800">Error</AlertTitle>
            <AlertDescription className="text-red-700">
                {apiStatus.message}
            </AlertDescription>
        </Alert>
    );
};

export default StatusAlert;