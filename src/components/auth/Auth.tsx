import { useFormik } from 'formik';
import styles from './auth.module.css'
import * as Yup from 'yup';
import { useAppDispatch } from '../../app/hooks';
import { loginUser } from '../../features/auth/authAction';

export interface IFormValues {
    username: string;
    password: string;
}

export interface IUserData {
    id: number;
    username: string;
    refreshToken: string,
    token: string,
}

const schema = Yup.object().shape({
    username: Yup.string().required('Username is required').min(2, 'Minimum 2 characters required'),
    password: Yup.string().required('Password is required').min(2, 'Minimum 2 characters required'),
});

export default function Auth() {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            username: 'emilys',
            password: 'emilyspass'
        } as IFormValues,
        validationSchema: schema,
        validateOnChange: false,
        onSubmit: async (values: IFormValues, {resetForm}) => {
        dispatch(loginUser(values))
        resetForm();
        },
    });

    return (
        <div>
        <h1>Auth</h1>
        <form onSubmit={formik.handleSubmit} className={styles.container}>
            <div>
            <input 
                type="text"
                name="username"
                placeholder="Username"
                onChange={formik.handleChange}
                value={formik.values.username}
            />
            {formik.errors.username && <div>{formik.errors.username}</div>}
            </div>
            <div>
            <input 
                type="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            {formik.errors.password && <div>{formik.errors.password}</div>}
            </div>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}
