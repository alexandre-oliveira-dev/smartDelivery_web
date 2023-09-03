import { useContext } from 'react';
import NavBarComponent from '../components/navbarComponent';
import '../styleGlobalDash.css';
import { Row, Spin, Typography } from 'antd';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as title,
  Tooltip,
  BarElement,
} from 'chart.js';
import Title from '../components/Title';
import { DashContext } from '../../../context/dashboard.context';
import CardSalesWeeksComponent from './components/card-salesWeeks.component';
/* import CardSalesMonthComponent from './components/card-salesMonth.component';
 */import CardTotalInfosComponent from './components/card-total-infos.component';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  title,
  Tooltip,
  BarElement
);

export default function Faturamento() {
  const { load } = useContext(DashContext);

  /* const nowdate = dayjs(new Date());
  const daysofmonth = [''];
  const totaldays = nowdate.daysInMonth();

  for (let dia = 1; dia <= totaldays; dia++) {
    daysofmonth.push(nowdate.date(dia).format('DD/MM/YYYY'));
  }*/

  return (
    <>
      <NavBarComponent btn2={true}></NavBarComponent>
      {load ? (
        <Spin
          size="large"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        ></Spin>
      ) : (
        <div className="box-global-dash">
          <div className="content-dasboard-pages">
            <Title
              align="center"
              color="#fff"
              size="25px"
              text="Faturamento"
            ></Title>
            <Typography.Title level={2}>Dashboard</Typography.Title>

            <Row gutter={20} style={{ width: '100%' }}>
              {/* <CardSalesMonthComponent></CardSalesMonthComponent> */}
              <CardSalesWeeksComponent></CardSalesWeeksComponent>
            </Row>
            <CardTotalInfosComponent></CardTotalInfosComponent>
          </div>
        </div>
      )}
    </>
  );
}
