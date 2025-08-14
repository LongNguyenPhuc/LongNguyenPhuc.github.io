const backendHost = 'gateway.dev.meu-solutions.com'
const frontendHost = 'fosco-ttld.erp.meu-solutions.com'

const links = {
  analyticsGoogle: 'G-C9TEK9BS4C',
  // apiEndpoint: "http://localhost:3000/api/v1.0",
  apiEndpoint: `https://${backendHost}/foscottld/api/v1.0`,
  // imageEndpoint: 'https://utc2.erp.meu-solutions.com',
  imageEndpoint: `https://${backendHost}/foscottld`,
  backendHost,
  siteURL: `https://${frontendHost}`
}

export default links
