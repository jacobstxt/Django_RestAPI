import React, {useState} from "react";
import {Form, Button, type UploadFile} from "antd";
import {useRegisterMutation} from "../../services/userService.ts";
import type {IUserRegister} from "../../types/users/IUserRegister.ts";
import ImagesUploader from "../uploaders/ImagesUploader.tsx";
import {useDispatch} from "react-redux";
import {setTokens} from "../../store/authSlice.ts";
import {useNavigate} from "react-router";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import InputField from "../inputs/InputField.tsx";

const RegisterForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [register, { isLoading }] = useRegisterMutation();
    const [formValues, setFormValues] = useState<IUserRegister>({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        image: null,
        recaptcha_token: undefined,
    });
    const [errors, setErrors] = useState<string[]>([]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imageError, setImageError] = useState(false);




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };


    const validationChange = (isValid: boolean, fieldKey: string) => {
        if (isValid && errors.includes(fieldKey)) {
            setErrors(errors.filter(x => x !== fieldKey))
        } else if (!isValid && !errors.includes(fieldKey)) {
            setErrors(state => [...state, fieldKey])
        }
    };


   /* const onFinish: FormProps<IUserRegister>["onFinish"] = async (values) => {
        if (fileList.length === 0 || !fileList[0]?.originFileObj) {
            setImageError(true);
            return;
        }

        if (!executeRecaptcha) return;

        const token = await executeRecaptcha('register');

        const userRegister: IUserRegister = {
            ...values,
            image: fileList[0].originFileObj,
            recaptcha_token: token
        };

        try {
            console.log("Send Data Server", userRegister);
            const result = await register(userRegister).unwrap();
            console.log(result);
            dispatch(setTokens(result));
            navigate('/');
        } catch (err: any) {
            const errorMessage = err?.data?.errors?.Name?.[0];
            console.error(errorMessage);
        }
    };*/


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (fileList.length === 0 || !fileList[0]?.originFileObj) {
            setImageError(true);
            return;
        }

        if (!executeRecaptcha) return;
        const token = await executeRecaptcha("register");

        const payload: IUserRegister = {
            ...formValues,
            image: fileList[0].originFileObj,
            recaptcha_token: token,
        };

        try {
            const result = await register(payload).unwrap();
            dispatch(setTokens(result));
            navigate("/login");
        } catch (err: any) {
            console.error(err?.data?.errors);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="First name"
                    name="first_name"
                    placeholder="John"
                    value={formValues.first_name}
                    onChange={handleChange}
                    onValidationChange={validationChange}
                    rules={[{ rule: "required", message: "First name is required" }]}
                />

                <InputField
                    label="Last name"
                    name="last_name"
                    placeholder="Smith"
                    value={formValues.last_name}
                    onChange={handleChange}
                    onValidationChange={validationChange}
                    rules={[{ rule: "required", message: "Last name is required" }]}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="Username"
                    name="username"
                    placeholder="JohnSmith"
                    value={formValues.username}
                    onChange={handleChange}
                    onValidationChange={validationChange}
                    rules={[{ rule: "required", message: "Username is required" }]}
                />

                <InputField
                    label="Email"
                    name="email"
                    placeholder="smith@example.com"
                    value={formValues.email}
                    onChange={handleChange}
                    onValidationChange={validationChange}
                    rules={[
                        { rule: "required", message: "Email is required" },
                        { rule: "regexp", value: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', message: "Email is invalid" },
                    ]}
                />
            </div>

            <InputField
                label="Password"
                type="password"
                name="password"
                placeholder="********"
                value={formValues.password}
                onChange={handleChange}
                onValidationChange={validationChange}
                rules={[{ rule: "required", message: "Password is required" }]}
            />

            <div className="w-full text-center">
                <ImagesUploader
                    fileList={fileList}
                    setFileList={setFileList}
                    imageError={imageError}
                    setImageError={setImageError}
                />
                {imageError && <p className="text-red-500 text-sm mt-1">Image is required</p>}
            </div>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    block
                    style={{ height: "40px", fontWeight: 600 }}
                >
                    Register
                </Button>
            </Form.Item>
        </form>
    );
};

export default RegisterForm;