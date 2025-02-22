import { ThemedLayoutV2, ThemedTitleV2, ThemedSiderV2 } from "@refinedev/antd";
import Header from './header';
import pemdaLogo from '../../images/pemda.png'; // Pastikan path benar

const Layout = ({ children }: React.PropsWithChildren) => {
  console.log('Layout rendered, pemdaLogo:', pemdaLogo);
  return (
    <ThemedLayoutV2
      Header={Header}
      Sider={() => <ThemedSiderV2 />}
      Title={(titleProps) => (
        <Space>
          <img src={pemdaLogo} alt="Pemda Logo" style={{ width: '24px', height: '24px' }} />
          <ThemedTitleV2 {...titleProps} text="My App" />
        </Space>
      )}
    >
      {children}
    </ThemedLayoutV2>
  );
};

export default Layout;