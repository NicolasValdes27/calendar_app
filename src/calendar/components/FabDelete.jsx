import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

    const { startDeletingEvent, hasEventSelected } = useCalendarStore();
    const { isDateModalOpen } = useUiStore();

    const handleDelete = () => {
        startDeletingEvent();
    }

    const checkDisplay = () => {
        if (!isDateModalOpen && hasEventSelected) {
            return '';
        }

        return 'none';
    }

    return (
        <button className="btn btn-danger fab-danger" onClick={handleDelete} style={{display: checkDisplay()}}>
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
