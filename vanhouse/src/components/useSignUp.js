import { React, useState } from 'react';

/*https://upmostly.com/tutorials/modal-components-react-custom-hooks*/
/*Accessed June 6, 2021*/
const useSignUp = () => {
    const [isShowing, setIsShowing] = useState();

    function toggle() {
        setIsShowing(!isShowing);
    }

    return {
        isShowing,
        toggle,
    }
};

export default useSignUp;