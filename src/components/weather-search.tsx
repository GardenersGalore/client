import Input from 'antd/lib/input';
import * as React from 'react';
import { ChangeEvent } from 'react';

import { withRouter, Redirect } from 'react-router';

const Search = Input.Search;

interface WeatherSearchProps {
  onSearch: any;
  history: any;
}

export const WeatherSearch: React.FC<WeatherSearchProps> = (props: WeatherSearchProps) => {
  const [location, setLocation] = React.useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setLocation(value);
  };

  const handleSubmit = () => {
    props.onSearch(location);
    props.history.push(`/search-result/${location}`);
  };

  return (
    <Search
      type='text'
      value={location}
      onChange={handleChange}
      onSearch={handleSubmit}
      onPressEnter={handleSubmit}
      placeholder='Search for plants'
      enterButton={true}
      style={{ verticalAlign: 'middle', width: '100%' }}
    />
  );
};
