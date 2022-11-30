import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore, useCalendarStore } from './';

export const useCalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: 'Nicolas',
        notes: 'Herrera',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValues.title.length > 0) 
            ? ''
            : 'is-invalid'
    }, [formValues.title, formSubmitted]);

    useEffect(() => {
      if (activeEvent !== null) {
        setFormValues({...activeEvent})
      }
    }, [ activeEvent ])
    

    const onInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const closeModal = () => {
        closeDateModal();
    }

    const onSumbmit = async(event) => {
        event.preventDefault();
        setFormSubmitted(true);
        const difference = differenceInSeconds(formValues.end, formValues.start);
        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
            return;
        }

        if (formValues.title.length <= 0) return;

        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmitted(false);
    }

    return {
        formValues,
        isDateModalOpen,
        titleClass,
        onInputChange,
        onDateChange,
        closeModal,
        onSumbmit,
    }
}
