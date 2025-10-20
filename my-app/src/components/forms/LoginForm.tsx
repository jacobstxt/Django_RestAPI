import {Form, Button, type FormProps} from "antd";
import {useLoginMutation,useLoginByGoogleMutation} from "../../services/userService.ts";
import {useDispatch} from "react-redux";
import {setTokens} from "../../store/authSlice.ts";
import {Link, useNavigate} from "react-router";
import type {ILoginRequest} from "../../types/users/ILoginRequest.ts";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import React, {useState} from "react";
import {useGoogleLogin} from "@react-oauth/google";
import type {IGoogleLoginRequest} from "../../types/users/IGoogleLoginRequest.ts";
import InputField from "../inputs/InputField.tsx";

const LoginForm: React.FC = () => {
    const [form] = Form.useForm();
    const [login, { isLoading }] = useLoginMutation();
    const [loginByGoogle] = useLoginByGoogleMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [errors, setErrors] = useState<string[]>([]);

    const validationChange = (isValid: boolean, fieldKey: string) => {
        if (isValid && errors.includes(fieldKey)) {
            setErrors(errors.filter(x => x !== fieldKey))
        } else if (!isValid && !errors.includes(fieldKey)) {
            setErrors(state => [...state, fieldKey])
        }
    };

    /*const onFinish: FormProps<ILoginRequest>["onFinish"] = async (values) => {
        try {
            if (!executeRecaptcha) return;

            const token = await executeRecaptcha('login');

            const result = await login({...values, recaptcha_token: token}).unwrap();
            console.log(result);
            dispatch(setTokens(result));
            navigate('/');
        } catch (err: any) {
            const errorMessage = err?.data?.errors?.Name?.[0];
            console.error(errorMessage);
        }
    };*/

    const onFinish: FormProps<ILoginRequest>["onFinish"] = async (values) => {
        try {
            if (!executeRecaptcha) return;

            console.log("🧾 Values before sending:", values);

            const token = await executeRecaptcha("login");
            console.log("✅ Recaptcha token:", token);

            const payload = { ...values, recaptcha_token: token };
            console.log("📤 Payload to backend:", payload);

            const result = await login(payload).unwrap();
            console.log("🎉 Backend response:", result);

            dispatch(setTokens(result));
            navigate("/");
        } catch (err: any) {
            console.error("❌ Login error full:", err);

            // докладніше виведи що саме прийшло від сервера
            if (err?.data) {
                console.log("⚠️ Backend error response:", err.data);
            } else {
                console.log("⚠️ Network or unknown error:", err);
            }

            const errorMessage =
                err?.data?.detail ||
                err?.data?.errors?.Name?.[0] ||
                "Помилка входу, перевір дані";
            console.error("❌ Error message:", errorMessage);
        }
    };



    const loginUseGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const model: IGoogleLoginRequest = { token: tokenResponse.access_token };
                const result = await loginByGoogle(model).unwrap();
                dispatch(setTokens(result));
                navigate("/");
            } catch (error) {
                console.error(error);
            }
        },
    });

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{width: "100%"}}
            >

                <Form.Item name="username" rules={[{required: true}]}>
                    <InputField
                        label={"username"}
                        name={"username"}
                        placeholder="Хустон"
                        rules={[
                            {
                                rule: 'required',
                                message: "Пошта є обов'язкова"
                            },
                            {
                                rule: 'regexp',
                                value: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
                                message: "Пошта є некоректна"
                            }

                        ]}
                        onValidationChange={validationChange}
                    />
                </Form.Item>

                <Form.Item name="password" rules={[{required: true}]}>
                    <InputField
                        label={"password"}
                        name={"password"}
                        type={"password"}
                        placeholder="Please enter your password"
                        rules={[
                            {
                                rule: 'required',
                                message: "Пароль є обов'язковим"
                            },
                            {
                                rule: 'regexp',
                                value: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
                                message: "Пароль ковбаса"
                            }

                        ]}
                        onValidationChange={validationChange}
                    />
                </Form.Item>

                <Link to="/forgot-password">Forgot password?</Link>

                <button
                    onClick={(event) => {
                        event.preventDefault();
                        loginUseGoogle();
                    }}
                    className="flex items-center justify-center gap-2 bg-white
                         text-gray-700 border border-gray-300 hover:shadow-md
                         transition px-4 py-2 rounded w-full mt-4 font-medium"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    Увійти через Google
                </button>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        block
                        style={{height: "40px", fontWeight: 600, marginTop: "1rem"}}
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginForm;