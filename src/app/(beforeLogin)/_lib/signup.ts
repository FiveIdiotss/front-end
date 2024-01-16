'use server';

import axios from 'axios';
import { on } from 'events';

const onSubmit = async (currentState: any, formData: FormData) => {
    console.log(formData);
};

export default onSubmit;
