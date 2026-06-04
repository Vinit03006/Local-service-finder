import './ConfirmModal.css';

function ConfirmModal({isOpen,onClose,onConfirm,message}){

    if (!isOpen) return null;
    return (
        <div className='cm-overlay' onClick={onClose}>

            <div className='cm-popup' onClick={(e)=>e.stopPropagation()}>

                <div style={{"display":"flex","justifyContent":"flex-end"}}>

                    <button className="ad-cancel-btn"onClick={onClose}>
                        X
                    </button> 
                </div>
                <div className='cm-popup-content'>
                    {message || "Are You Sure?"}
                </div>
                <div style={{"display":"flex","justifyContent":"space-around"}}>
                    <button className='cm-logout-btn' onClick={onConfirm}>
                        Log out
                    </button>
                    <button className='cm-cancel-btn2' onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;