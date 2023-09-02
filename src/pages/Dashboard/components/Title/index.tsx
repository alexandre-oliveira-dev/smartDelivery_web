import { useContext } from 'react';
import { DashContext } from '../../../../context/dashboard.context';

type Styles = {
  size: string;
  color: string;
  align: 'center' | 'start' | 'end';
  text: string;
};
export default function Title({ align, color, size, text }: Styles) {
  const { corNavPrev } = useContext(DashContext);

  return (
    <div
      style={{
        width: 'calc(100% - 250px)',
        margin: '20px 0 20px 0',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <h2
        style={{
          textAlign: align,
          color: color,
          fontSize: size,
          width: '80%',
          padding: '10px 0 10px 0',
          backgroundColor: !corNavPrev ? '#5B72F2' : corNavPrev,
          borderRadius: '10px',
        }}
      >
        {text}
      </h2>
    </div>
  );
}
