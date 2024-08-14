import './css/Modal.css';

export default function Modal({child, vis}) {
    return (
        <>
            {vis
                ?<div className='Modal active'>
                    <div className="ModalContent" onClick={e => {
                        if (e && e.stopPropagation) {
                            e.stopPropagation()}
                        }
                    }>
                        {child}
                    </div>
                </div>
                :''
            }
        </>
    );
}