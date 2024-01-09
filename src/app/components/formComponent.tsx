import { ChangeEventHandler, FormEventHandler,  useState } from "react";
import { ToastContainer, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storeData } from "../googlesheets";
export default function FormComponent() {
    const [fName, setFname] = useState<string>('');
    const [lName, setLname] =useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [bringAGuest, setBringAGuest] = useState<boolean>(false);
    const toastConfig:ToastOptions = {
        position: "top-right",
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    }
    const notify = (text:string, isSuccess = false) => {
        if(isSuccess){
            toast.success(text, {...toastConfig, autoClose: 2000,})
        } else{
            toast.error(text,{...toastConfig, autoClose: 2000,})
        }
    };
    const restoreDefault = ()=> {
        setFname('');
        setLname('');
        setEmail('');
        setBringAGuest(false);
        window.scrollTo({
            top:0,
            left:0,
            behavior:'smooth',
        });
    }
    const onInputChange:ChangeEventHandler<HTMLInputElement> = (event) => {
        switch(event.target.name){
            case 'first-name':
                setFname(event.target.value);
                break;
            case 'last-name':
                setLname(event.target.value);
                break;
            case 'email':
                setEmail(event.target.value);
                break;
            case 'bring-a-guest':
                setBringAGuest(event.target.checked);
                break;
            default:
        }
    }
    const handleButtonClick:FormEventHandler<HTMLFormElement>  = async(e) => {
        const arrayToStore = [fName, lName, email, bringAGuest ? 'Yes': 'No'];
        e.preventDefault();
        try{
            const id = toast.info('Please wait', toastConfig);
            const isSuccess = await storeData(arrayToStore);
            toast.dismiss(id)
            if(isSuccess){
                restoreDefault();
                notify('Successfully done', true);
            } else{
                notify('Something went wrong', false);
            }
        }
        catch(error){
            console.log('notify')
            notify('Something went wrong', false);
            console.log(error);
        }
        
    }
    return (
        <>
        <form onSubmit={handleButtonClick}>
            <p>TOKLAS, Surrey St, Temple, London WC2R 2ND, 7PM  24.02.2024</p>
            <div className="row input-row">
                <input name="first-name" value={fName} type="text" id="first-name" placeholder="First name" onChange={onInputChange} required />
                <input name="last-name" value={lName} type="text" id="last-name" placeholder="Last name" onChange={onInputChange} required />
            </div>
            <input name="email" type="email" id="email" value={email} className="row" placeholder="Email" onChange={onInputChange} required />
            <div className="row non-center-row">
                
                <input name="bring-a-guest" type="checkbox" checked={bringAGuest} id='bring-a-guest' title="Will you bring a guest?" onChange={onInputChange} />
                <label htmlFor="bring-a-guest">Will you bring a guest?</label>
            </div>
            <button type="submit" className="form-button">RSVP</button>
            
        </form>
        <ToastContainer />
        </>
    );
}