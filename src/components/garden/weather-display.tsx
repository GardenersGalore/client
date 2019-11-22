import { Popover, Badge, Icon, Button, Popconfirm, message, List, Card, Col, Row, Avatar} from 'antd/lib';
import * as React from 'react';
import { Planting, RootState, Weather, WeatherDay } from '../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { getForecastData } from '../../store/actions';
import { useEffect } from 'react';
import { Loading } from '../loading';
import { Error } from '../error';

export interface WeatherDisplayProps {
    country_name : string,
    city_name : string
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

    // date: "2019-11-22"
    // max-temperature: 22.9
    // min-temperature: 18.5
    // rainfall-amount: 3.3125
    // rainfall-probability: 50
    // snow: 0
    // weather:
    // code: 803
    // description: "Broken clouds"
    // icon: "c03d"
    
    const renderWeather = (weather : WeatherDay) => {
        return (
            <div>
                {weather.date}
            </div>
        )
    }

    const renderForecast = () => {
        // console.log(forecast);
        // let forecasts : any[] = [];
        // for(let i = 0; i < 5; i ++){
        //     const w = renderWeather(forecast.data[i]);
        //     console.log(w);
        //     forecasts.push(
        //     <Row>
        //         {w}
        //     </Row>); 
        // }

        return (
            <List
            dataSource={forecast.data}

            grid={{ gutter: 4, column: 3 }}
            itemLayout="vertical" 
            renderItem={weather => (
                <List.Item>
                    <Card>
                        {weather.date}
                        <Avatar size={50} className="userlogo" src={'../../assets/icons/' + weather.weather.icon + '.png'} />
                        {weather.weather.description}
                        Max : {weather.max_temperature}
                        Min : {weather.min_temperature}
                        Rainfall : {weather.rainfall_amount}
                        Snow : {weather.snow}
                    </Card>
                </List.Item>
              )}/>
        )

    }


    const renderContent = () => {
        if (isError) {
            return <Error error={error} />;
        } else if(forecast){
            return (
                <div>
                    {renderForecast()}
                </div>
            )
        }

    }

    return <div>{isLoading ? <Loading /> : renderContent()}</div>;

}
