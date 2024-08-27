import './css/Modal.css';

export default function Modal({child, vis, setVis}) {
    return (
        <>
            <div className={vis ? 'Modal active' : 'Modal'} onClick={() => setVis(false)}>
                <div className="ModalContent" onClick={e => e.stopPropagation()}>
                    {child}
                </div>
            </div>
        </>
    );
}