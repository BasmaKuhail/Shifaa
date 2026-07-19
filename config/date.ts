export function formatInvitationDate(dateValue: string): string {
        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return "—";
        }

        return new Intl.DateTimeFormat("ar", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(date);
    }