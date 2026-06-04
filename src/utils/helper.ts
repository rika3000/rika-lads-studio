// Convert date from "YYYY-MM-DD" to "Month Year" format
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (date === null) {
        return "";
    }
    return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });
};