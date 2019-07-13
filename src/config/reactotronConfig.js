import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({ host: 'rvieceli-dell' })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
