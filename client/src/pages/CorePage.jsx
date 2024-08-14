import { useState, useRef, useEffect } from 'react';
import './CP.css';
import SignUpForm from '../components/SignUpForm';
import LogInForm from '../components/LogInForm';
import Wrapper from '../components/Wrapper';

export default function CorePage() {
    const [formType, setFormType] = useState('signup');
    const [isLoad, setIsLoad] = useState(true);
    const firstCircleRef = useRef();
    const secondCircleRef = useRef();
    const btn = (<button
        type="button"
        className="changedButton"
        onClick={e => {
            e.stopPropagation()
            setFormType(formType === 'signup' ? 'login' : 'signup')
        }}
    >{formType === "signup" ? 'Already have an account? Log In!' : "Don't have an account? Sign Up!"}</button>)

    useEffect(() => {
        if (firstCircleRef.current && secondCircleRef.current) {
            if (!isLoad) {
                firstCircleRef.current.classList.remove('firstCircleAnimation', 'firstCircleAnimationSignUp');
                secondCircleRef.current.classList.remove('secondCircleAnimation', 'secondCircleAnimationSignUp');
                
                if (formType === 'signup') {
                    firstCircleRef.current.classList.add('firstCircleAnimationSignUp');
                    secondCircleRef.current.classList.add('secondCircleAnimationSignUp');
                } else {
                    firstCircleRef.current.classList.add('firstCircleAnimation');
                    secondCircleRef.current.classList.add('secondCircleAnimation');
                }
            }
            setIsLoad(false);
        }
    }, [formType]);

    return (
        <>
            <div className='firstCircle' ref={firstCircleRef}></div>
            <div className='secondCircle' ref={secondCircleRef}></div>
            <Wrapper style={{bR: '20px'}}>
                {formType === 'signup'
                    ? <SignUpForm btn={btn}/>
                    : <LogInForm btn={btn}/>
                }
            </Wrapper>
        </>
    );
}
