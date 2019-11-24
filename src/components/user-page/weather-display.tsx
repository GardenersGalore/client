import { Avatar, Row, Table } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { RootState, WeatherDay } from '../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { getForecastData } from '../../store/actions';
import { Loading } from '../loading';
import { Error } from '../error';
import Column from 'antd/lib/table/Column';

export interface WeatherDisplayProps {
  country_name: string;
  city_name: string;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = (props: WeatherDisplayProps) => {
  const dispatch = useDispatch();

  const forecast = useSelector((state: RootState) => state.gg.forecast);
  const error = useSelector((state: RootState) => state.gg.error);
  const isError = useSelector((state: RootState) => state.gg.isError);
  const isLoading = useSelector((state: RootState) => state.gg.isLoading);

  useEffect(() => {
    if (!isLoading && !isError) {
      if (!forecast) {
        dispatch(getForecastData(props.city_name, props.country_name));
      } else if (forecast.city_name !== props.city_name) {
        dispatch(getForecastData(props.city_name, props.country_name));
      }
    }
  });

  const renderContent = () => {
    if (isError) {
      return <Error error={error}/>;
    } else if (forecast) {
      return <div>{renderDailyForecastTable()}</div>;
    }
  };
  const expandedRowRender = (data: WeatherDay) => (
    <div>
      <Row>
        <div className='daily-forecast-sub-item-wrapper'>
          <div className='daily-forecast-sub-item-summary'>{data.weather.description}</div>
        </div>
      </Row>
    </div>
  );

  const renderDailyForecastTable = () => (
    <Table
      dataSource={forecast.data}
      pagination={false}
      rowKey={(data: WeatherDay) => String(data.date)}
      expandedRowRender={expandedRowRender}>
      <Column
        dataIndex='weather.icon'
        key='weather.icon'
        align='center'
        width='5rem'
        render={icon => (
          <div>
            <Avatar size={50} className='userlogo' src={'../../assets/icons/' + icon + '.png'}/>
          </div>
        )}
      />
      <Column
        title='Date'
        dataIndex='date'
        key='date'
        align='center'
        width='5rem'
        render={text => (
          <div className='daily-forecast-item'>
            {text}
            {/* {index === 0 ? 'Today' : Utils.getLocalTime(time, timezone.offset, 'ddd')} */}
          </div>
        )}
      />
      <Column
        title='Low'
        dataIndex='min_temperature'
        key='min_temperature'
        align='center'
        width='7rem'
        render={text => <div className='daily-forecast-item'>{text}°C</div>}
      />
      <Column
        title='High'
        dataIndex='max_temperature'
        key='max_temperature'
        align='center'
        width='7rem'
        render={text => <div className='daily-forecast-item'>{text}°C</div>}
      />
      <Column
        title='Snow'
        dataIndex='snow'
        key='snow'
        align='center'
        width='7rem'
        render={text => <div className='daily-forecast-item'>{text}</div>}
      />
      <Column
        title='Rain'
        dataIndex='rainfall_amount'
        key='rainfall_amount'
        align='center'
        width='7rem'
        render={text => <div className='daily-forecast-item'>{text}mm</div>}
      />
    </Table>
  );

  return <div>{isLoading ? <Loading/> : renderContent()}</div>;
};
