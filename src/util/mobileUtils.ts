const isDeviceMobile = () => {
  // check userAgent if the device is on Mobile
  return navigator.userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  )
    ? true
    : false;
};

export { isDeviceMobile };
