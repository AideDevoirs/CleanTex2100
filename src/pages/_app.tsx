/* eslint-disable */
import { AppProps } from 'next/app';
import Head from 'next/head'; // Importez Head pour gérer les balises <head>


import '../styles/main.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    {/* Configuration globale du <head> */}
    <Head>
      <link rel="icon" href="/assets/images/ClLogo.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Component {...pageProps} />
  </>
);

export default MyApp;
