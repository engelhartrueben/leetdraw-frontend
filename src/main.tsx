import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Routes from './Routes';
import theme from './styles/theme';

import { MantineProvider } from "@mantine/core";

window.process = {
	cwd: () => '/'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={theme}>
		<Routes />
	</MantineProvider>
  </StrictMode>
)
