import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import FormPostagem from '../formpostagem/FormPostagem'

function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='rounded text-white border-white border-solid border-2 py-2 px-4 hover:bg-white hover:text-blue-900 cursor-pointer transition-all duration-300'
                    >
                        Nova Postagem
                    </button>
                }
                modal
                contentStyle={{
                    borderRadius: '1rem',
                    paddingBottom: '2rem'
                }}
            >
                <FormPostagem />
            </Popup>
        </>
    )
}

export default ModalPostagem