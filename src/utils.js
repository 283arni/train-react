const createControl = (config, validation) => {
  return {
    ...config,
    validation,
    valid: true,
    touched: false,
    value: ''
  }
}

export default createControl;
