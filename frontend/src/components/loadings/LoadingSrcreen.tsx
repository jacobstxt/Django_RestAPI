import {Flex, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import React from "react";

const LoadingScreen: React.FC = () => {
    return (
        <Flex align="center" gap="middle">
            <Spin fullscreen indicator={<LoadingOutlined style={{fontSize: 48}} spin/>}/>
        </Flex>
    )
}

export default LoadingScreen;