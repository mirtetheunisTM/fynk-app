import Svg, { Ellipse, Path } from 'react-native-svg';

const FriendsIcon = ({ color }) => (
  <Svg width={35} height={29} viewBox="0 0 35 29" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path d="M26.6711 21.6366C26.6711 21.6366 25.8227 16.5457 29.6408 16.1215C33.4589 15.6972 34.3075 19.9396 34.3074 21.2124C34.3074 22.4852 34.7317 25.879 30.9135 25.8791C27.0953 25.8791 26.6711 21.6366 26.6711 21.6366Z" 
    fill={color}
    stroke={color}/>
    <Path d="M24.7011 27.9992H1.36804C1.36804 27.9992 -1.17738 14.8477 12.3982 14.8477C25.9738 14.8477 24.7011 27.9992 24.7011 27.9992Z" 
    fill={color}
    stroke={color}/>
    <Ellipse cx="13.2464" cy="6.36364" rx="6.36356" ry="6.36364" fill={color}/>
    <Ellipse cx="26.2461" cy="5.93857" rx="5.09085" ry="5.09091" fill={color}/>
</Svg>

);

export default FriendsIcon;