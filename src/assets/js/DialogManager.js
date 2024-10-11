export const openDialogModal = (id) => {
    const modal = document.getElementById(id);
    modal.classList.add('modal-open');
};

export const closeDialogModal = (id) => {
    const modal = document.getElementById(id);
    modal.classList.remove('modal-open');
};