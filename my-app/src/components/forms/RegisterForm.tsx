import React, {useState} from "react";
import {Form, Button, Row, Col, type UploadFile, type FormProps} from "antd";
import {useRegisterMutation} from "../../services/userService.ts";
import type {IUserRegister} from "../../types/users/IUserRegister.ts";
import ImagesUploader from "../uploaders/ImagesUploader.tsx";
import {useDispatch} from "react-redux";
import {setTokens} from "../../store/authSlice.ts";
import {useNavigate} from "react-router";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import InputField from "../inputs/InputField.tsx";

const RegisterForm: React.FC = () => {
    const [form] = Form.useForm();
    const [register, { isLoading }] = useRegisterMutation();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imageError, setImageError] = useState(false);
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


    const onFinish: FormProps<IUserRegister>["onFinish"] = async (values) => {
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
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ width: "100%" }}
        >
            <Form.Item name="username">
                <InputField
                    label={"username"}
                    name={"username"}
                    placeholder="Хустон"
                    rules={[
                {
                    rule: 'required',
                    message: "Юзер нейм є обов'язковий"
                },
                    ]}
                    onValidationChange={validationChange}
                    />
            </Form.Item>

            <Row gutter={16}>
                <Col xs={24} md={12}>
                    <Form.Item name="first_name">
                        <InputField
                            label={"first name"}
                            name={"first_name"}
                            placeholder="John"
                            rules={[
                                {
                                    rule: 'required',
                                    message: "Ім'я є обов'язкове"
                                },
                            ]}
                            onValidationChange={validationChange}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item name="last_name">
                        <InputField
                            label={"last name"}
                            name={"last_name"}
                            placeholder="John"
                            rules={[
                                {
                                    rule: 'required',
                                    message: "Прізвище є обов'язкове"
                                },
                            ]}
                            onValidationChange={validationChange}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item name="email">
                <InputField
                    label={"email"}
                    name={"email"}
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

            <Form.Item name="password">
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
                            value: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
                            message: "Пароль некоректний"
                        }

                    ]}
                    onValidationChange={validationChange}
                />
            </Form.Item>

            <Form.Item
                label="image"
                required
                validateStatus={imageError ? "error" : ""}
                className="w-full text-center"
            >
                <ImagesUploader
                    fileList={fileList}
                    setFileList={setFileList}
                    imageError={imageError}
                    setImageError={setImageError}
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                    block
                    style={{ height: "40px", fontWeight: 600 }}
                >
                    REGISTER
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;