import { Row } from 'antd';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import im2 from '../../../assets/ilu3.png';

export default function SectionIlustration() {
  function handleMoveScrollPage() {
    window.scrollTo({ top: 1000, behavior: 'smooth' });
  }

  return (
    <>
      <section className="section2">
        <div className="ilu2">
          <img src={im2} alt=""></img>
        </div>
        <div className="box-text-info">
          <h2>
            <strong>Simplifique</strong> seus pedidos de delivery com{' '}
            <strong>rapidez</strong> e <strong>facilidade</strong> em nosso
            site, tornando cada refeição uma experiência ágil e{' '}
            <strong>deliciosa</strong>.
          </h2>
          <Row>
            <h3>Tá, mas como funciona? 🧐</h3>
            <MdKeyboardDoubleArrowDown
              onClick={handleMoveScrollPage}
              color="#5B72F2"
              size={80}
              className="animation"
            ></MdKeyboardDoubleArrowDown>
          </Row>
        </div>
      </section>
    </>
  );
}
