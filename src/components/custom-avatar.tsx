import { getNameInitials } from '@/utilities';
import { Avatar as AntdAvatar } from 'antd';

type Props = {
    name?: string;
    src?: string;
    size?: number | "small" | "large" | "default";
    style?: React.CSSProperties;
    shape?: "circle" | "square";
    onClick?: () => void; // ✅ Tambahkan onClick
}

const CustomAvatar = ({ name, style, src, shape, onClick, size = "default", ...rest }: Props) => {
  return (
    <AntdAvatar
      alt={name}
      size={size}
      src={src} // ✅ Pastikan src ada agar avatar bisa muncul
      style={{ 
        backgroundColor: '#87d068',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer', // ✅ Menambahkan cursor pointer
        userSelect: 'none', // ✅ Mencegah teks di dalam avatar bisa di-select
        ...style
      }}
      onClick={() => {
        if (onClick) onClick(); // ✅ Pastikan event diteruskan
      }}
      {...rest}
    >
      {src ? null : getNameInitials(name || '')} {/* ✅ Menampilkan inisial jika tidak ada gambar */}
    </AntdAvatar>
  );
};

export default CustomAvatar;
